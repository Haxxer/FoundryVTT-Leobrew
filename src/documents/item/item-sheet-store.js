import { writable, get } from 'svelte/store';
export default function createItemSheetState(item) {

  const { set, update, subscribe } = writable({
    item
  });

  const addSkill = async (skill) => {
    update((val) => {
      val.activeTab = val.tabs[2];
      return val;
    })
  }

  return {
    set,
    update,
    subscribe,
    addSkill
  };

}
