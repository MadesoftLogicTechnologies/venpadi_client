<template>
  <div class="bg-white rounded-xl" :class="page ? 'pb-20' : ''">
    <div
      class="overflow-x-auto relative slim-scrollbar rounded-xl border border-[#EBECEF]"
    >
      <table v-if="data" class="table-auto min-w-full border-collapse">
        <!-- Table headers -->
        <thead
          class="text-left bg-[#F5F6FA] text-[#757C86] font-medium text-sm"
        >
          <tr>
            <th v-if="showCheckbox" class="px-4 py-2.5">
              <input
                type="checkbox"
                :checked="selectedAll"
                @change="toggleSelectAll"
                class="w-4 h-4 rounded border-gray-300"
              />
            </th>
            <th
              v-if="page"
              class="text-sm text-header px-4 font-semibold py-2.5"
            >
              S.L
            </th>
            <th
              v-for="(header, index) in headers"
              :key="index"
              class="text-sm text-header font-semibold px-3 py-2.5 overflow-hidden whitespace-nowrap"
            >
              {{ header }}
            </th>
            <th
              v-if="dropdownOptions"
              class="text-sm text-header font-semibold px-4 py-2.5"
            >
              Actions
            </th>
          </tr>
        </thead>
        <!-- Table body -->
        <tbody class="text-[#39404F] text-sm bg-white">
          <tr
            v-for="(row, rowIndex) in filteredData"
            :key="rowIndex"
            class="border-b border-[#EBECEF] cursor-pointer"
          >
            <td v-if="showCheckbox" class="px-4">
              <input
                type="checkbox"
                v-model="selectedRows[rowIndex]"
                :disabled="isCheckboxDisabled(rowIndex)"
                @change="handleCheckboxChange(rowIndex)"
                class="w-4 h-4 rounded border-gray-300"
              />
            </td>
            <!-- Serial number -->
            <td
              v-if="page"
              class="px-4 text-bodytext font-medium text-sm overflow-hidden text-left"
            >
              <p>
                {{
                  rowIndex + 1 + (props.page - 1) * 10 > 9
                    ? rowIndex + 1 + (props.page - 1) * 10
                    : "0" + (rowIndex + 1 + (props.page - 1) * 10)
                }}
              </p>
            </td>

            <!-- Table data cells -->
            <td
              v-for="(item, colIndex) in row"
              :key="colIndex"
              :class="[
                colIndex !== 0 ? 'py-2' : 'py-2 pl-0 text-header font-medium',
                'px-3 text-bodytext text-sm overflow-hidden text-left w-auto whitespace-nowrap flex-grow ',
              ]"
            >
              <div class="flex rounded w-auto whitespace-nowrap flex-grow">
                <template
                  v-if="
                    ['very good', 'good', 'fair', 'poor', 'very pad'].includes(
                      item
                    )
                  "
                >
                  <div class="flex items-center space-x-1">
                    <i
                      v-for="n in 5"
                      :key="n"
                      class="pi pi-star-fill text-sm"
                      :class="{
                        'text-[#45B369]': n <= getStarCount(item),
                        'text-[#9CA3AF]': n > getStarCount(item),
                      }"
                    ></i>
                  </div>
                </template>
                <template
                  v-else-if="
                    typeof item === 'object' && item && item.name && item.image
                  "
                >
                  <div class="flex items-center space-x-2 min-w-max">
                    <img
                      v-if="item?.image"
                      :src="item.image || profile"
                      alt="profile"
                      class="w-7 h-7 rounded-full object-cover shrink-0"
                    />

                    <span class="text-sm text-bodytext whitespace-nowrap">{{
                      item.name
                    }}</span>
                  </div>
                </template>
                <span
                  v-else
                  class="w-auto whitespace-nowrap flex-grow"
                  :class="{
                    'py-1 px-2 max-w-[80px] truncate rounded text-xs font-medium flex justify-center border border-[#45B369] bg-[#E3F4E9] text-[#45B369] capitalize':
                      item === 'active' ||
                      item === 'done' ||
                      item === 'completed' ||
                      item === 'submitted' ||
                      item === 'complete' ||
                      item === 'approved' ||
                      item === 'paid' ||
                      item === 'ongoing' ||
                      item === 'not flagged' ||
                      item === 'accepted',
                    'py-1 px-2 max-w-[160px] truncate rounded text-xs font-medium flex justify-center border border-[#45B369] bg-[#E3F4E9] text-[#45B369] capitalize':
                      typeof item === 'string' &&
                      item.toLowerCase().includes(' approved'),
                    'py-1 px-2 max-w-[80px] rounded text-xs font-medium flex justify-center bg-dark text-white ':
                      headers[colIndex] === 'Total Ans',
                    'py-1 px-2 max-w-[80px] truncate rounded text-xs font-medium flex justify-center bg-[#FFFAEB] border border-[#F79009] text-[#F79009] capitalize':
                      item === 'incomplete' ||
                      item === 'pending' ||
                      item === 'incomplete',
                    'py-1 px-2 max-w-[160px] truncate rounded text-xs font-medium flex justify-center bg-[#FFFAEB] border border-[#F79009] text-[#F79009] capitalize':
                      (typeof item === 'string' &&
                        item.toLowerCase().includes('not approved')) ||
                      (typeof item === 'string' &&
                        item.toLowerCase().includes('retake pending')),
                    'py-1 px-2 max-w-[160px] truncate rounded text-xs font-medium flex justify-center bg-[#FEF2F2] border border-[#DC2626] text-[#DC2626] capitalize':
                      item === 'inactive' ||
                      item === 'cancelled' ||
                      item === 'unpaid' ||
                      item === 'declined' ||
                      item === 'unapproved' ||
                      item === 'suspended' ||
                      item === 'archived' ||
                      item === 'flagged' ||
                      item === 'not accepted' ||
                      item === 'Submission Pending' ||
                      (typeof item === 'string' &&
                        item.toLowerCase().includes('submission pending')),
                    'py-1 px-2 max-w-[80px] truncate rounded text-xs font-medium flex justify-center bg-[#DEE1E5] border border-[#4B5563] bg-opacity-5 text-[#4B5563] capitalize':
                      item === 'inactive' || item === 'cancelled',
                  }"
                >
                  {{ item }}
                </span>
              </div>
            </td>
            <!-- Actions column -->
            <td
              v-if="dropdownOptions"
              class="px-4 font-medium text-sm overflow-hidden text-left"
            >
              <div class="flex space-x-3 px-3 py-1 rounded">
                <button
                  v-for="(action, actionIndex) in dropdownOptions[rowIndex]"
                  :key="actionIndex"
                  class="text-pink text-opacity-80 hover:text-pink hover:text-opacity-100 flex items-center gap-2"
                  @click="handleOptionClick({ action, rowIndex })"
                >
                  <div
                    v-if="action.toLowerCase() === 'view'"
                    class="bg-[#487FFF] bg-opacity-15 flex justify-center items-center w-6 h-6 rounded-full"
                  >
                    <i class="pi pi-eye text-[#487FFF]"></i>
                  </div>
                  <div
                    v-else-if="action.toLowerCase() === 'edit'"
                    class="bg-[#45B369] bg-opacity-15 flex justify-center items-center w-6 h-6 rounded-full text-[17px]"
                  >
                    <i class="mdi mdi-square-edit-outline text-[#45B369]"></i>
                  </div>
                  <div
                    v-else-if="action.toLowerCase() === 'pin'"
                    class="bg-[#45B369] bg-opacity-15 flex justify-center items-center w-6 h-6 rounded-full text-[17px]"
                  >
                    <i class="mdi mdi-pin text-[#45B369]"></i>
                  </div>
                  <div
                    v-else-if="action.toLowerCase() === 'unpin'"
                    class="bg-[#45B369] bg-opacity-15 flex justify-center items-center w-6 h-6 rounded-full text-[17px]"
                  >
                    <i class="mdi mdi-pin text-[#FF4155]"></i>
                  </div>
                  <div
                    v-else-if="action.toLowerCase() === 'archive'"
                    class="bg-[#F79009] bg-opacity-15 flex justify-center items-center w-6 h-6 rounded-full text-[17px]"
                  >
                    <i class="mdi mdi-archive-outline text-[#F79009]"></i>
                  </div>
                  <div
                    v-else-if="action.toLowerCase() === 'activate'"
                    class="bg-[#45B369] bg-opacity-15 flex justify-center items-center w-6 h-6 rounded-full text-[17px]"
                  >
                    <i class="mdi mdi-check-circle-outline text-[#45B369]"></i>
                  </div>
                  <div
                    v-else-if="action.toLowerCase() === 'recommend'"
                    class="bg-[#FFFAEB] bg-opacity-15 flex justify-center items-center w-6 h-6 rounded-full text-[17px]"
                  >
                    <i class="mdi mdi-star-outline text-[#F79009]"></i>
                  </div>
                  <div
                    v-else-if="action.toLowerCase() === 'approve'"
                    class="bg-[#45B369] bg-opacity-15 flex justify-center items-center w-6 h-6 rounded-full text-[17px]"
                  >
                    <i class="mdi mdi-check-circle-outline text-[#45B369]"></i>
                  </div>
                  <div
                    v-else-if="action.toLowerCase() === 'decline'"
                    class="bg-[#FF41552E] bg-opacity-15 flex justify-center items-center w-6 h-6 rounded-full text-[17px]"
                  >
                    <i class="mdi mdi-close-circle-outline text-[#FF4155]"></i>
                  </div>
                  <div
                    v-else-if="action.toLowerCase() === 'delete'"
                    class="bg-[#FF41552E] bg-opacity-15 flex justify-center items-center w-6 h-6 rounded-full text-[17px]"
                  >
                    <i class="mdi mdi-delete-outline text-[#FF4155]"></i>
                  </div>

                  <p v-else>{{ action }}</p>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import profile from "~/assets/images/profileupload.svg";
const props = defineProps({
  data: Array,
  headers: Array,
  dropdownOptions: Array,
  page: {
    type: Number,
    required: false,
  },
  showCheckbox: {
    type: Boolean,
    default: false,
  },
  maxSelection: {
    type: Number,
    default: Infinity,
  },
  preSelectedRows: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["optionClick", "selectionChange"]);

function handleOptionClick({ action, rowIndex }) {
  emit("optionClick", { option: action, index: rowIndex });
}

const searchQuery = ref("");

const filteredData = computed(() => {
  return props.data.filter((row) =>
    Object.values(row).some((val) =>
      val.toString().toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  );
});

const getStarCount = (rating) => {
  const starMap = {
    "very good": 5,
    good: 4,
    fair: 3,
    poor: 2,
    "very poor": 1,
  };
  return starMap[rating] || 0;
};

const selectedRows = ref({});

// Initialize selected rows based on preSelectedRows prop
const initializeSelectedRows = () => {
  if (props.preSelectedRows && props.preSelectedRows.length > 0) {
    const newSelection = {};
    props.preSelectedRows.forEach((index) => {
      newSelection[index] = true;
    });
    selectedRows.value = newSelection;
  }
};

// Watch for changes in preSelectedRows
watch(() => props.preSelectedRows, initializeSelectedRows, { immediate: true });

const selectedCount = computed(
  () => Object.values(selectedRows.value).filter(Boolean).length
);
const selectedAll = computed(() => {
  return (
    filteredData.value.length > 0 &&
    filteredData.value.every((_, index) => selectedRows.value[index])
  );
});

const isCheckboxDisabled = (rowIndex) => {
  if (selectedRows.value[rowIndex]) return false;
  return selectedCount.value >= props.maxSelection;
};

const handleCheckboxChange = (rowIndex) => {
  const selectedIndices = Object.entries(selectedRows.value)
    .filter(([_, isSelected]) => isSelected)
    .map(([index]) => Number(index));

  emit("selectionChange", selectedIndices);
};

const toggleSelectAll = () => {
  if (selectedAll.value) {
    selectedRows.value = {};
  } else {
    const newSelection = {};
    filteredData.value.forEach((_, index) => {
      if (index < props.maxSelection) {
        newSelection[index] = true;
      }
    });
    selectedRows.value = newSelection;
  }
  handleCheckboxChange();
};
</script>

<style scoped>
.slim-scrollbar::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.slim-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 4px;
}

/* Ensure hover thumb color remains the same */
.slim-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: rgba(0, 0, 0, 0.2) !important;
}

.slim-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

/* Remove scrollbar arrows (buttons) */
.slim-scrollbar::-webkit-scrollbar-button {
  display: none;
}

.slim-scrollbar {
  scrollbar-width: thin; /* Firefox */
  scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
}

/* Custom checkbox styles */
input[type="checkbox"] {
  appearance: none;
  -webkit-appearance: none;
  width: 16px;
  height: 16px;
  border: 2px solid #e5e7eb;
  border-radius: 4px;
  outline: none;
  cursor: pointer;
  position: relative;
  background: white;
  transition: all 0.2s ease;
}

input[type="checkbox"]:checked {
  background-color: #487fff;
  border-color: #487fff;
}

input[type="checkbox"]:checked::after {
  content: "";
  position: absolute;
  left: 4px;
  top: 1px;
  width: 5px;
  height: 9px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

input[type="checkbox"]:disabled {
  background-color: #e5e7eb;
  border-color: #e5e7eb;
  cursor: not-allowed;
}

input[type="checkbox"]:hover:not(:disabled) {
  border-color: #487fff;
}
</style>
