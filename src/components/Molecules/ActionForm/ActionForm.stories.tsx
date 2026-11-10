import Button from "../../Atoms/Button/Button.astro";
import FormField from "../FormField/FormField.astro";
import ActionForm from "./ActionForm.astro";

const meta = {
  title: "Components/Organisms/ActionForm",
  component: ActionForm,
  tags: ["autodocs"],
};

export default meta;

export const Defaults = {
  render: () => [
    {
      component: ActionForm,
      props: {
        turnstile: false,
      },
      slots: {
        default: [
          {
            component: FormField,
            props: {
              id: "name",
              label: "Name",
              inputType: "TextInput",
              required: true,
            },
          },
          {
            component: FormField,
            props: {
              id: "email",
              label: "Email",
              inputType: "TextInput",
              inputProps: {
                type: "email",
              },
              required: true,
            },
          },
          {
            component: Button,
            props: {
              type: "submit",
              color: "pink",
            },
            slots: {
              default: "Subscribe",
            },
          },
        ],
      },
    },
  ],
};
