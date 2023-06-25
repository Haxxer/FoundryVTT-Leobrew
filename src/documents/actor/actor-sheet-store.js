import { writable, get } from 'svelte/store';
import ActorInventory from "./Tabs/ActorInventory.svelte";
import ActorTraits from "./Tabs/ActorTraits.svelte";
import ActorBiography from "./Components/ActorBiography.svelte";
import { TJSDialog } from "@typhonjs-fvtt/runtime/svelte/application";
import ActorInjuries from "./Components/ActorInjuries.svelte";

export default function createActorSheetState(actor) {

  const tabs = [
    { value: "inventory", label: "Inventory", component: ActorInventory },
    { value: "traits", label: "Traits", component: ActorTraits },
    { value: "injuries", label: "Injuries", component: ActorInjuries },
    { value: "biography", label: "Biography", component: ActorBiography },
  ]

  const { set, update, subscribe } = writable({
    activeTab: tabs[2],
    tabs,
    isExpanded: {
      inventory: new Set(),
      traits: new Set()
    },
    initialized: actor.system.experience.initialized,
    levelingUp: !actor.system.experience.initialized,
    leveledUpSkills: {},
    leveledUpAbilities: {},
    levelUpExperience: 0,
    actor
  });

  function assignSkillPoint(skillId, skillLevel, amount = 1, isAbility = false){
    update(state => {
      const pointsSpent = (state.leveledUpSkills?.[skillId]?.pointsSpent ?? 0)
      const previousLevel = skillLevel + pointsSpent;
      const newLevel = previousLevel + amount;
      const baseCost = isAbility ? 2 : 1;
      const cost = amount > 0
        ? (newLevel >= 5 ? newLevel : baseCost)
        : (previousLevel >= 5 ? -previousLevel : -baseCost);
      if(!state.leveledUpSkills[skillId]){
        state.leveledUpSkills[skillId] = {
          pointsSpent: 0,
          level: 0,
          cost: 0
        };
      }
      state.leveledUpSkills[skillId].level = newLevel;
      state.leveledUpSkills[skillId].pointsSpent = pointsSpent + amount;
      state.leveledUpSkills[skillId].cost += cost;
      state.levelUpExperience += cost;
      return state;
    })
  }

  function canAssignSkillPoint(skillId, skillLevel, isAbility = false){
    const state = get(this);
    const baseCost = isAbility ? 2 : 1;
    const pointsSpent = (state.leveledUpSkills?.[skillId]?.pointsSpent ?? 0) + baseCost;
    const level = skillLevel + pointsSpent;
    const cost = level >= 5 ? level : 1;
    return (state.levelUpExperience + cost) <= actor.system.experience.value;
  }

  function canSubtractSkillPoint(skillId){
    const state = get(this);
    return (state.leveledUpSkills?.[skillId]?.pointsSpent ?? 0) > 0;
  }

  async function addSkill(skillName){
    await actor.createEmbeddedDocuments("Item", [{
      name: skillName,
      type: "skill",
      "system.category": "Generic",
      "system.level": 1
    }]);
    const cost = get(this).initialized ? 5 : 1;
    await actor.update({
      "system.experience.value": actor.system.experience.value - cost,
      "system.experience.spent": actor.system.experience.spent + cost
    });
  }

  async function confirmLevelUp() {
    const data = get(this);
    if(!data.initialized){
      const decision = await TJSDialog.confirm({
        title: "Confirm Levels",
        content: `<p style='text-align: center;'>Are you sure you want to continue? Once you confirm your initial character, you cannot go back.</p>`
      }, { width: 270, height: "auto" })
      if(!decision) return;
    }
    await actor.update({
      "system.experience.value": actor.system.experience.value - data.levelUpExperience,
      "system.experience.spent": actor.system.experience.spent + data.levelUpExperience,
      "system.experience.initialized": true
    });
    await actor.updateEmbeddedDocuments("Item", Object.entries(data.leveledUpSkills).map(([_id, skill]) => ({
      _id, "system.level": skill.level
    })))
    update(state => {
      state.initialized = true;
      return state;
    })
    abortLevelUp();
  }

  function abortLevelUp() {
    update(state => {
      state.levelingUp = false;
      state.leveledUpSkills = {};
      state.levelUpExperience = 0;
      return state;
    })
  }

  // Remove an item
  function deleteItem(id) {
    update((state) => {
      if (state.isExpanded.traits[id]) {
        delete state.isExpanded.traits[id];
      }
      if (state.isExpanded.inventory[id]) {
        delete state.isExpanded.inventory[id];
      }
      return state;
    });
  }

  return {
    set,
    update,
    subscribe,
    deleteItem,
    addSkill,
    assignSkillPoint,
    canAssignSkillPoint,
    canSubtractSkillPoint,
    confirmLevelUp,
    abortLevelUp
  };

}
