<!-- HomePage.vue -->
<template>
  <div class="bg-gray-900 text-white">
    <!-- Hero Section -->
    <HeroSection id="hero" />

    <!-- Demo Section -->
    <DemoSection id="demo" />

    <!-- Options Section -->
    <OptionsSection />

    <!-- Benefits Section -->
    <!--    <BenefitsSection />-->

    <!-- Security Section -->
    <!--    <SecuritySection />-->

    <!-- Calculator Section -->
    <!--    <CalculatorSection id="calculator" />-->

    <!-- Features Section -->
    <!--    <FeaturesSection />-->

    <!-- Testimonials -->
    <!--    <TestimonialsSection />-->

    <!-- CTA Section -->
    <!--    <CtaSection />-->

    <!-- FAQ Section -->
    <!--    <FaqSection />-->
  </div>
</template>

<script setup lang="ts">
// Direct imports of components instead of using a barrel file
import HeroSection from '@/components/container/HomePage/HeroSection.vue'
import DemoSection from '@/components/container/HomePage/DemoSection.vue'
// import CalculatorSection from '@/components/container/HomePage/CalculatorSection.vue'
// import FeaturesSection from '@/components/container/HomePage/FeaturesSection.vue'
// import TestimonialsSection from '@/components/container/HomePage/TestimonialsSection.vue'
// import CtaSection from '@/components/container/HomePage/CtaSection.vue'
import OptionsSection from '@/components/container/HomePage/OptionsSection.vue'
// import BenefitsSection from '@/components/container/HomePage/BenefitsSection.vue'
// import SecuritySection from '@/components/container/HomePage/SecuritySection.vue'
// import FaqSection from '@/components/container/HomePage/FaqSection.vue'

// SEO
import { useSeo } from '@/composables/useSeo'
import { seoConfig } from '@/config/seo'

useSeo(seoConfig.home)
</script>
