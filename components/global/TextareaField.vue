<template>
  <div class="flex flex-col w-full space-y-2">
    <label class="text-header text-sm font-semibold">
      {{ label }}
      <span v-if="required" class="text-[#FF9F29]">*</span>
    </label>
    <div>
      <Textarea
        v-model="internalValue"
        :class="[ 
          'border border-border focus:none px-3 py-2 w-full bg-greybg outline-none text-sm text-header placeholder:text-bodytext placeholder:font-normal rounded-md -mb-1', 
          { 'border-red-500': validationError }, 
          { 'cursor-not-allowed': deactivated } 
        ]"
        :placeholder="placeholder"
        @blur="validateField"
        :disabled="deactivated"
        :rows="rows"
        :cols="cols"
      />
      <span v-if="validationError" class="text-red-500 italic text-sm">
        {{ validationError }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import * as Yup from "yup";

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: "",
  },
  modelValue: {
    type: String,
    required: true,
  },
  required: {
    type: Boolean,
    default: false,
  },
  deactivated: {
    type: Boolean,
    default: false,
  },
  rows: {
    type: Number,
    default: 2,
  },
  cols: {
    type: Number,
    default: 30,
  },
});

const emit = defineEmits(["update:modelValue"]);

const internalValue = ref(props.modelValue);
const validationError = ref("");

// Define validation schema
const validationSchema = Yup.string();
let schema = Yup.string().min(10, "Must be at least 10 characters");
if (props.required) {
  schema = schema.required("This field is required");
}

const validateField = async () => {
  try {
    await validationSchema.validate(internalValue.value);
    validationError.value = "";
  } catch (error) {
    validationError.value = error.message;
  }
};

watch(internalValue, (newValue) => {
  emit("update:modelValue", newValue);
  validateField();
});

watch(
  () => props.modelValue,
  (newValue) => {
    internalValue.value = newValue;
  }
);
</script>
