# Crypto Donate Feature Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a "Підтримати проект" modal with USDT TRC-20 wallet QR code and address, triggered from header button and footer link.

**Architecture:** Static client-side modal with QR code generated via `qrcode` npm package. Wallet address from `VITE_DONATE_USDT_ADDRESS` env variable. Analytics events for modal open and address copy. No backend needed.

**Tech Stack:** Vue 3 Composition API, Tailwind CSS, `qrcode` npm package, FontAwesome icons, existing `useAnalytics` composable.

---

### Task 1: Install qrcode dependency

**Files:**
- Modify: `package.json`

**Step 1: Install the package**

Run: `npm install qrcode`

**Step 2: Install types**

Run: `npm install -D @types/qrcode`

**Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add qrcode package for crypto donate QR generation"
```

---

### Task 2: Add environment variable and types

**Files:**
- Modify: `.env.example`
- Modify: `env.d.ts`

**Step 1: Add env variable to `.env.example`**

Add to `.env.example`:
```
# USDT TRC-20 wallet address for donations
VITE_DONATE_USDT_ADDRESS=
```

**Step 2: Add type to `env.d.ts`**

In `env.d.ts`, add `VITE_DONATE_USDT_ADDRESS` to `ImportMetaEnv`:

```typescript
interface ImportMetaEnv {
  readonly VITE_GA_MEASUREMENT_ID?: string
  readonly VITE_DONATE_USDT_ADDRESS?: string
}
```

**Step 3: Commit**

```bash
git add .env.example env.d.ts
git commit -m "chore: add VITE_DONATE_USDT_ADDRESS env variable and type"
```

---

### Task 3: Add analytics tracking methods

**Files:**
- Modify: `src/composables/useAnalytics.ts:60-84`

**Step 1: Add donate tracking methods**

Add before the `return` statement in `useAnalytics()`:

```typescript
const trackDonateModalOpened = (): void => {
  trackEvent('donate_modal_opened', {
    event_category: 'engagement',
    event_label: 'crypto_usdt_trc20'
  })
}

const trackDonateAddressCopied = (): void => {
  trackEvent('donate_address_copied', {
    event_category: 'conversion',
    event_label: 'usdt_trc20'
  })
}
```

Add to the return object:
```typescript
trackDonateModalOpened,
trackDonateAddressCopied
```

**Step 2: Run type check**

Run: `npm run type-check`
Expected: No errors

**Step 3: Commit**

```bash
git add src/composables/useAnalytics.ts
git commit -m "feat: add donate analytics tracking methods"
```

---

### Task 4: Create DonateModal component

**Files:**
- Create: `src/components/container/HomePage/DonateModal.vue`

**Step 1: Create the modal component**

The modal follows the existing pattern from `LoginModal.vue` (line 2-7): `fixed inset-0 bg-gray-900 bg-opacity-75` overlay with `bg-gray-800 p-8 rounded-lg` inner card.

```vue
<template>
  <div
    v-if="modelValue"
    class="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50"
    @click.self="closeModal"
  >
    <div class="bg-gray-800 p-8 rounded-lg w-full max-w-sm relative border border-gray-700">
      <button @click="closeModal" class="absolute top-4 right-4 text-gray-400 hover:text-white">
        <i class="fas fa-times"></i>
      </button>

      <div class="text-center">
        <div class="mb-4">
          <i class="fas fa-heart text-neon-green text-3xl"></i>
        </div>

        <h2 class="text-2xl font-bold text-white mb-2">Підтримати проект</h2>

        <p class="text-gray-400 mb-6 text-sm">
          Якщо сервіс був корисний — ви можете подякувати донатом на USDT-гаманець.
        </p>

        <div v-if="walletAddress">
          <div class="bg-white rounded-lg p-3 inline-block mb-4">
            <canvas ref="qrCanvas"></canvas>
          </div>

          <div class="mb-2">
            <span
              class="inline-block bg-gray-700 text-neon-green text-xs font-semibold px-3 py-1 rounded-full"
            >
              USDT (TRC-20 / Tron)
            </span>
          </div>

          <div
            class="flex items-center bg-gray-700 rounded-md p-3 mt-4 border border-gray-600 cursor-pointer hover:border-neon-green transition-colors duration-300"
            @click="copyAddress"
          >
            <span class="text-gray-300 text-xs break-all flex-1 text-left font-mono">
              {{ walletAddress }}
            </span>

            <button class="ml-3 text-neon-green hover:text-white transition-colors flex-shrink-0">
              <i :class="copied ? 'fas fa-check' : 'fas fa-copy'"></i>
            </button>
          </div>

          <p v-if="copied" class="text-neon-green text-xs mt-2">Адресу скопійовано!</p>
        </div>

        <div v-else class="text-gray-500 text-sm py-8">Адреса гаманця не налаштована.</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import QRCode from 'qrcode'
import { useAnalytics } from '@/composables/useAnalytics'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const walletAddress = import.meta.env.VITE_DONATE_USDT_ADDRESS || ''
const qrCanvas = ref<HTMLCanvasElement | null>(null)
const copied = ref(false)

const { trackDonateModalOpened, trackDonateAddressCopied } = useAnalytics()

function closeModal() {
  emit('update:modelValue', false)
}

async function copyAddress() {
  if (!walletAddress) return
  await navigator.clipboard.writeText(walletAddress)
  copied.value = true
  trackDonateAddressCopied()
  setTimeout(() => {
    copied.value = false
  }, 2000)
}

watch(
  () => props.modelValue,
  async (isOpen) => {
    if (isOpen) {
      trackDonateModalOpened()
      if (walletAddress) {
        await nextTick()
        if (qrCanvas.value) {
          QRCode.toCanvas(qrCanvas.value, walletAddress, {
            width: 180,
            margin: 0,
            color: { dark: '#000000', light: '#ffffff' }
          })
        }
      }
    } else {
      copied.value = false
    }
  }
)
</script>
```

**Step 2: Run type check**

Run: `npm run type-check`
Expected: No errors

**Step 3: Commit**

```bash
git add src/components/container/HomePage/DonateModal.vue
git commit -m "feat: create DonateModal component with QR code and copy address"
```

---

### Task 5: Add "Підтримати" button to TheHeader

**Files:**
- Modify: `src/components/container/HomePage/TheHeader.vue:12-41`

**Step 1: Add donate button and modal import**

After the existing nav links `<div class="hidden md:flex items-center space-x-8">` block (line 12-41), add the donate button inside the same container. Also add the DonateModal and state.

In the template, add a donate button after the Demo link (after line 31, inside the `hidden md:flex` div):

```html
<button
  @click="showDonateModal = true"
  class="text-neon-green border border-neon-green px-4 py-1.5 rounded-md hover:bg-neon-green hover:text-gray-900 transition-all duration-300 text-sm font-medium"
>
  <i class="fas fa-heart mr-1.5"></i>
  Підтримати
</button>
```

Add `<DonateModal v-model="showDonateModal" />` just before `</header>`.

In script setup, add:
```typescript
import DonateModal from './DonateModal.vue'
import { ref } from 'vue'

const showDonateModal = ref(false)
```

**Step 2: Run type check**

Run: `npm run type-check`
Expected: No errors

**Step 3: Commit**

```bash
git add src/components/container/HomePage/TheHeader.vue
git commit -m "feat: add donate button to header"
```

---

### Task 6: Add "Підтримати проект" link to TheFooter

**Files:**
- Modify: `src/components/container/HomePage/TheFooter.vue:66-100`

**Step 1: Add donate link in footer "Підтримка" section**

In the footer "Підтримка" `<ul>` (line 68), add a new `<li>` after the "Інструкція зі сплати податків" link (after line 99):

```html
<li>
  <a
    href="#"
    @click.prevent="showDonateModal = true"
    class="text-gray-400 hover:text-neon-green transition-colors duration-300 cursor-pointer"
  >
    <i class="fas fa-heart mr-1"></i>
    Підтримати проект
  </a>
</li>
```

Add `<DonateModal v-model="showDonateModal" />` just before `</footer>`.

In script setup, add:
```typescript
import DonateModal from './DonateModal.vue'
import { ref } from 'vue'

const showDonateModal = ref(false)
```

**Step 2: Run type check**

Run: `npm run type-check`
Expected: No errors

**Step 3: Commit**

```bash
git add src/components/container/HomePage/TheFooter.vue
git commit -m "feat: add donate link to footer"
```

---

### Task 7: Verify and test

**Step 1: Run full type check**

Run: `npm run type-check`
Expected: No errors

**Step 2: Run lint**

Run: `npm run lint`
Expected: No errors (or auto-fixed)

**Step 3: Run existing tests**

Run: `npm test`
Expected: All existing tests pass

**Step 4: Manual testing checklist**

Run: `npm run dev`

- [ ] Header shows "Підтримати" button on desktop
- [ ] Clicking header button opens modal
- [ ] Modal shows QR code when `VITE_DONATE_USDT_ADDRESS` is set in `.env`
- [ ] Modal shows "Адреса гаманця не налаштована" when env var is empty
- [ ] Copy button copies address and shows confirmation
- [ ] Clicking overlay (outside modal) closes it
- [ ] Close (X) button works
- [ ] Footer "Підтримати проект" link opens same modal
- [ ] Console shows analytics events (if GA configured)

**Step 5: Final commit if any fixes needed**

```bash
git add -A
git commit -m "fix: address review feedback for donate feature"
```