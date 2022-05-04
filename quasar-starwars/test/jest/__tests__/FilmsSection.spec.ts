import { describe, expect, it } from '@jest/globals';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { mount } from '@vue/test-utils';
import FilmsSection from 'src/pages/FilmsSection.vue';

// Specify here Quasar config you'll need to test your component
installQuasarPlugin();

const routerPushMock = jest.fn();

jest.mock('vue-router', () => ({
  useRouter: () => ({
    push: routerPushMock,
  }),
}));

describe('FilmsSection', () => {
  it('Should component has films array', () => {
    const wrapper = mount(FilmsSection);

    const { vm } = wrapper;
    expect(typeof vm.films).toBe('object');
  });
});
