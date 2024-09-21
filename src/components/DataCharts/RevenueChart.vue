<script setup lang="ts">
import { ref } from 'vue'
import { getDeal, type Deal } from '../common/DataTable/mocks'
import AssetsPercentageDoughnut from './AssetsPercentageDoughnut/AssetsPercentageDoughnut.vue'

const deals = ref<Deal[]>([
  getDeal({
    purchaseDate: new Date('2021-01-01'),
    saleDate: new Date('2021-01-10'),
    ticker: 'AAPL',
    quantity: 50,
    purchasePrice: 100,
    salePrice: 200
  }),
  getDeal({
    purchaseDate: new Date('2021-02-01'),
    saleDate: new Date('2021-01-10'),
    ticker: 'AAPL',
    quantity: 10,
    purchasePrice: 100,
    salePrice: 200
  }),
  getDeal({
    purchaseDate: new Date('2021-01-01'),
    saleDate: new Date('2021-02-10'),
    ticker: 'AMZN',
    quantity: 20,
    purchasePrice: 100,
    salePrice: 200
  }),
  getDeal({
    purchaseDate: new Date('2021-03-01'),
    saleDate: new Date('2021-04-10'),
    ticker: 'GOOGL',
    quantity: 150,
    purchasePrice: 100,
    salePrice: 200
  })
])
</script>

<template>
  <AssetsPercentageDoughnut :deals="deals" />
</template>

<style scoped></style>
