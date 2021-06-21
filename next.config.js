const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true'
});

const nextConfig = {
    i18n: {
      locales: ['en-US', 'ru', 'nl-NL'],
      defaultLocale: 'en-US',
    },
    future: {
      webpack5: true
    }
};

module.exports = withBundleAnalyzer(nextConfig);
