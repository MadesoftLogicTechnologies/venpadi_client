<template>
  <div class="flex flex-col w-full gap-2">
    <div
      v-if="label || labelRight"
      class="flex items-center justify-between gap-2"
    >
      <label v-if="label" class="text-header text-sm font-medium">
        {{ label }}
        <span v-if="required" class="text-primary">*</span>
      </label>
      <span v-if="labelRight" class="text-xs text-bodytext2">{{
        labelRight
      }}</span>
    </div>

    <div class="relative w-full">
      <span
        v-if="prefix || prefixIcon"
        class="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex items-center gap-2 text-sm text-bodytext pointer-events-none"
      >
        <i v-if="prefixIcon" :class="prefixIcon" class="text-bodytext2"></i>
        <span v-if="prefix" class="font-medium text-header">{{ prefix }}</span>
      </span>

      <input
        :type="showPassword && type === 'password' ? 'text' : type"
        v-model="internalValue"
        :class="[
          'block w-full min-h-[48px] rounded-xl border border-solid border-border bg-white px-3 py-3 text-sm text-header outline-none transition-colors placeholder:text-bodytext2 focus:border-primary',
          { 'border-red-500': validationError },
          { 'cursor-not-allowed opacity-60': deactivated || readonly },
          { 'pl-12': prefix || prefixIcon },
          { 'pr-10': type === 'password' || icon || suffixIcon },
          inputClass,
        ]"
        :readonly="readonly"
        :placeholder="placeholder"
        :disabled="deactivated"
        @blur="validateField"
      />

      <span
        v-if="type === 'password'"
        class="absolute right-3 top-1/2 -translate-y-1/2 z-10 cursor-pointer text-bodytext2"
        @click="togglePasswordVisibility"
      >
        <i :class="showPassword ? 'pi pi-eye-slash' : 'pi pi-eye'"></i>
      </span>

      <span
        v-else-if="icon || suffixIcon"
        class="absolute right-3 top-1/2 -translate-y-1/2 z-10 text-bodytext2"
        :class="{ 'cursor-pointer': suffixClickable }"
        @click="suffixClickable && $emit('suffix-click')"
      >
        <i :class="icon || suffixIcon"></i>
      </span>
    </div>

    <span v-if="validationError" class="text-red-500 italic text-sm">
      {{ validationError }}
    </span>
    <p v-if="hint" class="text-xs text-bodytext2">{{ hint }}</p>
  </div>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import * as Yup from "yup";

const props = defineProps({
  label: { type: String, default: "" },
  labelRight: { type: String, default: "" },
  type: { type: String, default: "text" },
  placeholder: { type: String, default: "" },
  modelValue: { type: [String, Number], required: true },
  required: { type: Boolean, default: false },
  deactivated: { type: Boolean, default: false },
  validatePassword: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  icon: { type: String, default: "" },
  suffixIcon: { type: String, default: "" },
  prefixIcon: { type: String, default: "" },
  prefix: { type: String, default: "" },
  hint: { type: String, default: "" },
  inputClass: { type: String, default: "" },
  suffixClickable: { type: Boolean, default: false },
});

const emit = defineEmits(["update:modelValue", "suffix-click"]);

const validationSchema = computed(() => {
  let schema = Yup.string();

  if (props.type === "text" && props.required) {
    schema = schema.min(3, "Must be at least 3 characters");
  }
  if (props.type === "number") {
    schema = Yup.number().typeError("Must be a number");
  }
  if (props.type === "email") {
    schema = schema.email("Must be a valid email");
  }
  if (props.type === "password" && props.validatePassword) {
    schema = schema
      .min(8, "Must be at least 8 characters")
      .matches(/[a-z]/, "Must contain a lowercase letter")
      .matches(/[A-Z]/, "Must contain an uppercase letter")
      .matches(/\d/, "Must contain a number");
  }
  if (props.required) {
    schema = schema.required("This field is required");
  }
  return schema;
});

const internalValue = ref(props.modelValue);
const validationError = ref("");
const showPassword = ref(false);

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const validateField = async () => {
  if (props.required || internalValue.value) {
    try {
      await validationSchema.value.validate(internalValue.value);
      validationError.value = "";
    } catch (error) {
      validationError.value = error.message;
    }
  }
};

watch(internalValue, (newValue) => {
  emit("update:modelValue", newValue);
});

watch(
  () => props.modelValue,
  (newValue) => {
    internalValue.value = newValue;
  }
);
</script>
