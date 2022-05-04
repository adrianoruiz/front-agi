import { describe, expect, it } from '@jest/globals';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { mount } from '@vue/test-utils';
import SpeciesSection from 'src/pages/SpeciesSection.vue';

// Specify here Quasar config you'll need to test your component
installQuasarPlugin();

const routerPushMock = jest.fn();

jest.mock('vue-router', () => ({
  useRouter: () => ({
    push: routerPushMock,
  }),
}));

describe('SpeciesSection', () => {
  it('Should component has films array', () => {
    const wrapper = mount(SpeciesSection);
    const { vm } = wrapper;
    expect(typeof vm.species).toBe('object');
  });
});
