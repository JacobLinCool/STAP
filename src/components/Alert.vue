<script setup lang="ts">
import type { AlertType } from "../types";
import { Check, Alert, X } from "../icons";
import { ref } from "vue";
defineProps<{ type?: AlertType; title?: string; text?: string }>();

const alive = ref(true);
</script>

<template>
    <div :class="'alert alert-' + type" v-if="alive">
        <div class="alert-icon">
            <X v-if="type === 'error'" />
            <Check v-if="type === 'success'" />
            <Alert v-if="type === 'warning'" />
        </div>
        <div class="alert-content">
            <h3>{{ title }}</h3>
            <p>{{ text }}</p>
        </div>
    </div>
</template>

<style scoped>
.alert-error {
    @apply bg-red-300;
}

.alert-warning {
    @apply bg-yellow-300;
}

.alert-success {
    @apply bg-green-300;
}

.alert {
    @apply w-80 h-14 fixed z-10 flex bg-opacity-80 rounded neumorphism-raised pointer-events-none;
}

.alert-icon {
    @apply flex justify-center items-center ml-2 mr-3;
}

.alert-content {
    text-shadow: 0 0 0.5rem #ffffff88;
    @apply flex flex-col justify-center;
}

.alert-content h3 {
    @apply text-lg font-bold;
}

.alert-content p {
    @apply text-sm;
}

.neumorphism-raised {
    box-shadow: inset 0 0 0 transparent, inset 0 0 0 transparent, -1px -0.75px 2px 0px #ffffff88,
        1px 0.75px 2px 0px #00000088;
}
</style>
