<template>
  <div class="flex flex-col w-full space-y-2">
    <label class="text-header text-sm font-semibold">
      {{ label }}
      <span v-if="required" class="text-[#FF9F29]">*</span>
    </label>
    <div class="flex justify-between">
      <div class="w-[20%]">
        <input
          :id="fieldId"
          :accept="type === 'image' ? 'image/*' : 'application/pdf'"
          type="file"
          @change="handleFileUpload"
          class="hidden"
        />
        <div class="w-full">
          <label
            :for="fieldId"
            class="focus:none py-2 flex whitespace-nowrap truncate justify-center cursor-pointer w-full border-l border-y border-[#D1D5DB] bg-[#E4F1FF] outline-none text-sm text-[#4B5768] rounded-l-md"
          >
            Choose File
          </label>
        </div>
      </div>
      <div class="w-[80%]">
        <input
          v-if="filePreview"
          type="text"
          disabled
          class="border-r border-y border-[#D1D5DB] focus:none p-2 w-full bg-greybg outline-none text-sm placeholder:text-primary placeholder:font-bold rounded-r-md"
          :placeholder="fileName || (file ? file.name : '')"
        />
        <input
          v-else
          type="text"
          disabled
          class="border-r border-y border-[#D1D5DB] focus:none p-2 w-full bg-greybg outline-none text-sm placeholder:text-[#CACACA] placeholder:font-normal rounded-r-md"
          :placeholder="`Choose ${type} to upload ${
            dimensions ? `(${dimensions})` : ''
          }`"
        />
      </div>
    </div>
    <!-- <div>
      <div
        v-if="filePreview && type === 'image'"
        class="border cursor-pointer border-gray-400 flex flex-col justify-center items-center text-center space-y-2 py-3 rounded-lg relative"
        @dragover.prevent
        @drop.prevent="handleDrop"
        @click="$refs.fileInput.click()"
      >
        <img :src="filePreview" alt="Preview" class="w-52 h-28" />
        <div class="absolute flex flex-col justify-center items-center">
          <img src="~/assets/images/upload.svg" alt="" class="w-10" />
          <p class="text-[#AAAAAA]">
            Drag and drop image here {{ dimensions ? `(${dimensions})` : "" }}
          </p>
        </div>
      </div>
      <div
        v-else-if="filePreview && type === 'pdf'"
        class="border cursor-pointer border-gray-400 flex flex-col justify-center items-center text-center space-y-2 py-3 rounded-lg relative"
        @dragover.prevent
        @drop.prevent="handleDrop"
        @click="$refs.fileInput.click()"
      >
        <iframe :src="filePreview" class="w-full h-64" frameborder="0"></iframe>
        <div class="absolute flex flex-col justify-center items-center">
          <img src="~/assets/images/upload.svg" alt="" class="w-10" />
          <p class="text-[#AAAAAA]">
            Drag and drop PDF here {{ dimensions ? `(${dimensions})` : "" }}
          </p>
        </div>
      </div>
      <div
        v-else
        class="border cursor-pointer border-gray-400 flex flex-col justify-center items-center text-center space-y-2 py-5 rounded-lg"
        @dragover.prevent
        @drop.prevent="handleDrop"
        @click="$refs.fileInput.click()"
      >
        <img src="~/assets/images/upload.svg" alt="Upload Icon" class="w-10" />
        <p class="text-[#AAAAAA]">
          Drag and drop {{ type }} here
          {{ dimensions ? `(${dimensions})` : "" }}
        </p>
      </div>
    </div> -->
    <span class="text-red-500" v-if="error">{{ error }}</span>
    <input
      ref="fileInput"
      type="file"
      :accept="type === 'image' ? 'image/*' : 'application/pdf'"
      class="hidden"
      @change="handleFileUpload"
    />
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import * as Yup from "yup";
import { useToastStore } from "~/store/toast";
const toastStore = useToastStore();

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "image", // or 'pdf'
  },
  required: {
    type: Boolean,
    default: false,
  },
  previewUrl: {
    type: String,
    default: null,
  },
  fileName: {
    type: String,
    default: "",
  },
  forcePreviewNull: {
    type: Boolean,
    default: false,
  },
  dimensions: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:file", "validation"]);

const fieldId = `file-upload-${props.label.replace(/\s+/g, "-").toLowerCase()}`;
const file = ref(null);
const filePreview = ref(props.previewUrl || null);
const error = ref("");
const fileName = ref(props.fileName || "");
const fileInput = ref(null);

// File size validation constants (e.g., 10MB for PDFs, 5MB for images)
const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 5MB for images
const MAX_PDF_SIZE = 10 * 1024 * 1024; // 10MB for PDFs

// Validate the file type and ensure it's either an image or a PDF
const validationSchema = Yup.mixed().test(
  "fileType",
  `Invalid file type. Only ${
    props.type === "image" ? "images" : "PDFs"
  } are allowed.`,
  (value) =>
    !value ||
    (value &&
      value.type.startsWith(
        props.type === "image" ? "image/" : "application/pdf"
      ))
);

// Watch for file changes and update the preview and filename
watch(
  file,
  (newFile) => {
    if (newFile) {
      if (typeof newFile === "string") {
        // Directly use the URL or base64 string as the preview
        filePreview.value = newFile;
      } else {
        fileName.value = newFile.name;
        const reader = new FileReader();
        reader.onload = (e) => {
          filePreview.value = e.target.result;
        };
        reader.readAsDataURL(newFile);
      }
    } else {
      filePreview.value = null;
      fileName.value = "";
    }
  },
  { immediate: true }
);

// Watch for changes in the previewUrl prop
watch(
  () => props.previewUrl,
  (newUrl) => {
    if (newUrl) {
      filePreview.value = newUrl;
    }
  },
  { immediate: true }
);

// Watch for changes in the fileName prop
watch(
  () => props.fileName,
  (newName) => {
    if (newName) {
      fileName.value = newName;
    }
  },
  { immediate: true }
);

// Watch for changes in forcePreviewNull prop
watch(
  () => props.forcePreviewNull,
  (shouldForceNull) => {
    if (shouldForceNull) {
      filePreview.value = null;
      file.value = null;
      fileName.value = "";
    }
  }
);

const handleDrop = (event) => {
  const droppedFile = event.dataTransfer.files[0];

  // Validate file type
  if (props.type === "image" && !droppedFile.type.startsWith("image/")) {
    showError("Please drop an image file.");
    return;
  }
  if (props.type === "pdf" && droppedFile.type !== "application/pdf") {
    showError("Please drop a PDF file.");
    return;
  }

  // Validate file size
  if (props.type === "image" && droppedFile.size > MAX_IMAGE_SIZE) {
    showError("Image size exceeds 3 MB.");
    return;
  }
  if (props.type === "pdf" && droppedFile.size > MAX_PDF_SIZE) {
    showError("PDF size exceeds 2 MB.");
    return;
  }

  // If no errors, set file and preview
  file.value = droppedFile;
  fileName.value = droppedFile.name;

  const reader = new FileReader();
  reader.onload = (e) => {
    filePreview.value = e.target.result;
  };
  reader.readAsDataURL(droppedFile);

  emit("update:file", droppedFile);
  emit("validation", true);
  error.value = "";
};

const handleFileUpload = async (event) => {
  const uploadedFile = event.target.files[0];
  file.value = uploadedFile;

  if (uploadedFile) {
    // Reset error if a new file is uploaded
    error.value = "";

    // Validate file type
    if (props.type === "image" && !uploadedFile.type.startsWith("image/")) {
      showError("Please upload an image file.");
      return;
    }
    if (props.type === "pdf" && uploadedFile.type !== "application/pdf") {
      showError("Please upload a PDF file.");
      return;
    }

    // Validate file size
    if (props.type === "image" && uploadedFile.size > MAX_IMAGE_SIZE) {
      showError("Image size exceeds 3 MB.");
      return;
    }
    if (props.type === "pdf" && uploadedFile.size > MAX_PDF_SIZE) {
      showError("PDF size exceeds 2 MB.");
      return;
    }

    // Handle PDF or image preview
    const reader = new FileReader();
    reader.onload = (e) => {
      filePreview.value = e.target.result;
    };
    reader.readAsDataURL(uploadedFile);

    emit("update:file", uploadedFile);
    emit("validation", true);
  } else {
    filePreview.value = null;
    fileName.value = "";
    emit("validation", false);
  }
};

const showError = (message) => {
  error.value = message;
  file.value = null;
  filePreview.value = null;
  fileName.value = "";

  // Show error toast
  toastStore.setMessage({
    text: message,
    type: "error",
  });
};
</script>
