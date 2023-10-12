import { get, writable } from 'svelte/store';
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
    activeTab: tabs[0],
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

  function assignSkillPoint(skillId, skillLevel, amount = 1, isAbility = false) {
    update(state => {
      let pointsSpent = (state.leveledUpSkills?.[skillId]?.pointsSpent ?? 0)
      let previousLevel = skillLevel + pointsSpent;
      let newLevel = previousLevel + amount;
      if (!newLevel) {
        if (amount < 0) {
          newLevel--;
          amount--;
        } else if (amount > 0) {
          newLevel++;
          amount++;
        }
      }
      const baseCost = isAbility ? 2 : 1;
      const cost = amount > 0
        ? (newLevel >= 5 ? newLevel : baseCost)
        : (previousLevel >= 5 ? -previousLevel : -baseCost);
      if (!state.leveledUpSkills[skillId]) {
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

  function canAssignSkillPoint(skillId, skillLevel, isAbility = false) {
    const state = get(this);
    const pointsSpent = (state.leveledUpSkills?.[skillId]?.pointsSpent ?? 0) + 1;
    const level = skillLevel + pointsSpent;
    if (!state.initialized && level >= 5) return false;
    const baseCost = isAbility ? 2 : 1;
    const cost = level >= 5 ? level : baseCost;
    return (state.levelUpExperience + cost) <= actor.system.experience.value;
  }

  function canSubtractSkillPoint(skillId, skillLevel, isAbility = false) {
    const state = get(this);
    const currentState = (state.leveledUpSkills?.[skillId]?.pointsSpent ?? 0);
    const level = skillLevel + currentState;
    if (isAbility) {
      return level > -3;
    }
    return currentState > 0;
  }

  async function addSkill(skillName) {
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
    if (!data.initialized) {
      const decision = await TJSDialog.confirm({
        title: "Confirm Levels",
        content: `<p style='text-align: center;'>Are you sure you want to continue? Once you confirm your initial character, you cannot go back.</p>`
      }, { width: 270, height: "auto" });
      if (!decision) return;
    }
    const updates = Object.entries(data.leveledUpSkills).map(([_id, skill]) => ({
      _id, "system.level": skill.level
    }));
    const actorUpdates = updates.filter(item => !actor.items.get(item._id))
      .reduce((acc, attribute) => {
        acc[`system.abilities.${attribute._id}.value`] = attribute["system.level"];
        return acc;
      }, {})
    const itemUpdates = updates.filter(item => !!actor.items.get(item._id))
    await actor.update({
      "system.experience.value": actor.system.experience.value - data.levelUpExperience,
      "system.experience.spent": actor.system.experience.spent + data.levelUpExperience,
      "system.experience.initialized": true,
      ...actorUpdates
    });
    await actor.updateEmbeddedDocuments("Item", itemUpdates);
    update(state => {
      state.initialized = true;
      return state;
    })
    abortLevelUp();
  }

  async function addExperience(exp) {
    await actor.update({
      "system.experience.value": actor.system.experience.value + exp
    });
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
    addExperience,
    assignSkillPoint,
    canAssignSkillPoint,
    canSubtractSkillPoint,
    confirmLevelUp,
    abortLevelUp
  };

}
