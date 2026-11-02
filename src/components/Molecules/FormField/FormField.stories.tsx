import FormField from "./FormField.astro";

const meta = {
  title: "Components/Molecules/FormField",
  component: FormField,
  tags: ["autodocs"],
};

export default meta;

export const Basic = {
  render: () => [
    "<div class='container-450-w padding-50'>",
    {
      component: FormField,
      props: {
        label: "Name",
        id: "name",
        name: "name",
        inputType: "TextInput",
        inputProps: {
          type: "text",
        },
      },
    },
    "</div>",
  ],
};
