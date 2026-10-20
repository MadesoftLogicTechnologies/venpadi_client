<template>
  <div class="flex flex-col w-full space-y-2">
    <label v-if="label" class="text-header text-sm font-medium">
      {{ label }}
      <span v-if="required" class="text-primary">*</span>
    </label>
    <div>
      <Dropdown
        v-if="!isMultiselect"
        v-model="internalValue"
        :options="options"
        :optionLabel="optionLabel"
        :optionValue="optionValue"
        :placeholder="placeholder"
        :class="dropdownClass"
      />

      <MultiSelect
        v-else
        v-model="internalValue"
        :options="options"
        :optionLabel="optionLabel"
        :optionValue="optionValue"
        :placeholder="placeholder"
        class="border border-border focus:border-primary w-full bg-white outline-none text-sm text-header placeholder:text-bodytext2 placeholder:font-normal rounded-xl"
      />

      <span class="text-red-500 italic text-sm" v-if="error">{{ error }}</span>
    </div>
  </div>
</template>

<script setup>
import * as Yup from "yup";

const props = defineProps({
  modelValue: {
    type: [String, Number, Object, Array],
    default: "",
  },
  label: {
    type: String,
  },
  options: {
    type: Array,
    required: true,
  },
  placeholder: {
    type: String,
    default: "Select an option",
  },
  optionLabel: {
    type: String,
    default: "",
  },
  optionValue: {
    type: String,
    default: "",
  },
  required: {
    type: Boolean,
    default: false,
  },
  error: {
    type: String,
    default: "",
  },
  isMultiselect: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: "default",
    validator: (value) => ["default", "sm", "lg"].includes(value),
  },
});

const emit = defineEmits(["update:modelValue", "validation"]);

const internalValue = ref(props.modelValue);
const error = ref("");

const dropdownClass = computed(() => {
  const baseClass =
    "border border-border focus:border-primary w-full bg-white outline-none text-sm text-header placeholder:text-bodytext2 placeholder:font-normal rounded-xl";

  const sizeClasses = {
    default: "",
    sm: "text-sm",
    lg: "text-lg",
  };

  return `${baseClass} ${sizeClasses[props.size]}`;
});

const validationSchema = computed(() => {
  let schema = Yup.mixed();
  if (props.required) {
    schema = schema
      .required("This field is required.")
      .test("value", "Invalid selection.", (value) => {
        if (props.isMultiselect) return Array.isArray(value) && value.length > 0;
        return value !== "" && value !== null && value !== undefined;
      });
  }
  return schema;
});

watch(internalValue, async (newValue) => {
  try {
    if (props.required) {
      await validationSchema.value.validate(newValue);
    }
    error.value = "";
    emit("update:modelValue", newValue);
    emit("validation", true);
  } catch (validationError) {
    error.value = validationError.message;
    emit("validation", false);
    // Still sync selection so the UI stays usable
    emit("update:modelValue", newValue);
  }
});

watch(
  () => props.modelValue,
  (newValue) => {
    internalValue.value = newValue;
  },
);
</script>
