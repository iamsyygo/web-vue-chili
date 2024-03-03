import { InjectionKey, Ref } from 'vue';

export const GLOBAL_SYMBOL_BY_INJECT = {
  // spinning
  SPINNING: Symbol('spinning') as InjectionKey<{
    spinning: Ref<boolean>;
    updateSpin: () => void;
  }>,
};
