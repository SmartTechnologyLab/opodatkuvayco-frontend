import CustomButton from '@/components/CustomButton/CustomButton.vue'
import { icons, severities } from '@/components/CustomButton/utils/assets'
export default {
  name: 'CustomButton',
  component: CustomButton,
  args: {
    icon: Object.values(icons)[3],
    severity: Object.values(severities)[2]
  },
  argTypes: {
    onClick: { action: 'click' },
    icon: {
      control: {
        type: 'radio',
        options: Object.values(icons)
      }
    },
    severity: {
      control: {
        type: 'radio',
        options: Object.values(severities)
      }
    }
  }
}

const Template = (args: any) => ({
  components: { CustomButton },
  setup() {
    return { args }
  },
  template: `<CustomButton v-bind="args" />`
})

export const Default = Template.bind({})

export const Icons = (args: any) => ({
  components: { CustomButton },
  setup() {
    return { args, icons }
  },
  template: `<CustomButton v-for="icon in icons" v-bind='{ ...args, icon }' />`
})
