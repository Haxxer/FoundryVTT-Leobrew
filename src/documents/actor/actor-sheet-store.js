import { writable, get } from 'svelte/store';

export default function createActorSheetState(actor) {

  const { set, update, subscribe } = writable({
    isExpanded: {
      inventory: new Set(),
      traits: new Set()
    },
    levelingUp: false,
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

  async function confirmLevelUp() {
    const data = get(this);
    await actor.update({ "system.experience.value": actor.system.experience.value - data.levelUpExperience });
    await actor.updateEmbeddedDocuments("Item", Object.entries(data.leveledUpSkills).map(([_id, skill]) => ({
      _id, "system.level": skill.level
    })))
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
    assignSkillPoint,
    canAssignSkillPoint,
    canSubtractSkillPoint,
    confirmLevelUp,
    abortLevelUp
  };

}
