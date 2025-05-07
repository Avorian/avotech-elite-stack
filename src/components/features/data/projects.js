
import FeatureCard from './FeatureCard.astro';
import { features } from '../../data/features.js';
import { getThemeClasses } from '../../utils/themeClassMap.js';
const { theme } = Astro.props;
const classes = getThemeClasses(theme);


<section id="features" class={`relative z-40 py-16 px-6 sm:px-12 md:px-20 ${classes.text}`}>
  <div class={`max-w-6xl mx-auto rounded-lg p-10 backdrop-blur-md ${classes.bg}`}>
    <h2 class={`text-3xl sm:text-4xl md:text-5xl font-bold mb-12 text-center tracking-wide ${classes.font} ${classes.glitch}`}>
      What We Bring to the Table
    </h2>
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
      {features.map((f) => (
        <FeatureCard {...f} theme={theme} />
      ))}
    </div>
  </div>
</section>
