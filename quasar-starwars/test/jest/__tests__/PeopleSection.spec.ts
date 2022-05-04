import { describe, expect, it } from '@jest/globals';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { mount } from '@vue/test-utils';
import PeopleSection from 'src/pages/PeopleSection.vue';

// Specify here Quasar config you'll need to test your component
installQuasarPlugin();

const routerPushMock = jest.fn();

jest.mock('vue-router', () => ({
  useRouter: () => ({
    push: routerPushMock,
  }),
}));

describe('PeopleSection', () => {
  it('Should component has films array', () => {
    const wrapper = mount(PeopleSection);
    const { vm } = wrapper;
    expect(typeof vm.characters).toBe('object');
  });
});
