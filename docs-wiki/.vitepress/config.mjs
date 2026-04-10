export default {
  title: "emplus Docs Wiki",
  description: "Generated docs for emplus",
  cleanUrls: true,
  ignoreDeadLinks: true,
  vite: {
    optimizeDeps: {
      include: [],
    },
  },
  transformPageData(pageData, { siteConfig }) {
    pageData.frontmatter.head ??= [];
    const href = `${siteConfig.site.base}docs-wiki.css`;
    if (!pageData.frontmatter.head.some((entry) => Array.isArray(entry) && entry[0] === 'link' && entry[1] && entry[1].href === href)) {
      pageData.frontmatter.head.push(['link', { rel: 'stylesheet', href }]);
    }
  },
  themeConfig:
  {
    "search": {
      "provider": "local"
    },
    "nav": [
      {
        "text": "Overview",
        "link": "/"
      },
      {
        "text": "Features",
        "link": "/features/"
      },
      {
        "text": "Design",
        "link": "/design/"
      },
      {
        "text": "Workspaces",
        "link": "/workspaces/"
      },
      {
        "text": "Reference",
        "link": "/reference/"
      }
    ],
    "sidebar": {
      "/": [
        {
          "text": "Features",
          "collapsed": true,
          "items": [
            {
              "text": "Feature Catalog",
              "link": "/features/"
            },
            {
              "text": "Administration Login",
              "link": "/features/admin-login"
            },
            {
              "text": "Administration Notify",
              "link": "/features/admin-notify"
            },
            {
              "text": "Administration Read / List",
              "link": "/features/admin-list"
            },
            {
              "text": "Administration Verification",
              "link": "/features/admin-verify"
            },
            {
              "text": "Authentication Login",
              "link": "/features/auth-login"
            },
            {
              "text": "Authentication Password Reset",
              "link": "/features/auth-reset"
            },
            {
              "text": "Authentication Read / List",
              "link": "/features/auth-list"
            },
            {
              "text": "Authentication Verification",
              "link": "/features/auth-verify"
            },
            {
              "text": "Design",
              "link": "/features/design"
            },
            {
              "text": "Integrations Login",
              "link": "/features/integration-login"
            },
            {
              "text": "Integrations Notify",
              "link": "/features/integration-notify"
            },
            {
              "text": "Integrations Read / List",
              "link": "/features/integration-list"
            },
            {
              "text": "Integrations Verification",
              "link": "/features/integration-verify"
            },
            {
              "text": "Mobile",
              "link": "/features/mobile"
            },
            {
              "text": "Notifications Login",
              "link": "/features/notification-login"
            },
            {
              "text": "Notifications Notify",
              "link": "/features/notification-notify"
            },
            {
              "text": "Notifications Read / List",
              "link": "/features/notification-list"
            },
            {
              "text": "Notifications Verification",
              "link": "/features/notification-verify"
            },
            {
              "text": "Order Management Login",
              "link": "/features/order-login"
            },
            {
              "text": "Order Management Notify",
              "link": "/features/order-notify"
            },
            {
              "text": "Order Management Read / List",
              "link": "/features/order-list"
            },
            {
              "text": "Order Management Verification",
              "link": "/features/order-verify"
            },
            {
              "text": "Reporting Login",
              "link": "/features/reporting-login"
            },
            {
              "text": "Reporting Read / List",
              "link": "/features/reporting-list"
            },
            {
              "text": "Reporting Verification",
              "link": "/features/reporting-verify"
            },
            {
              "text": "Search Create",
              "link": "/features/search-create"
            },
            {
              "text": "Search Login",
              "link": "/features/search-login"
            },
            {
              "text": "Search Notify",
              "link": "/features/search-notify"
            },
            {
              "text": "Search Read / List",
              "link": "/features/search-list"
            },
            {
              "text": "Storage Login",
              "link": "/features/storage-login"
            },
            {
              "text": "Storage Notify",
              "link": "/features/storage-notify"
            },
            {
              "text": "Storage Read / List",
              "link": "/features/storage-list"
            },
            {
              "text": "Storage Verification",
              "link": "/features/storage-verify"
            },
            {
              "text": "User Management Create",
              "link": "/features/user-create"
            },
            {
              "text": "User Management Login",
              "link": "/features/user-login"
            },
            {
              "text": "User Management Notify",
              "link": "/features/user-notify"
            },
            {
              "text": "User Management Read / List",
              "link": "/features/user-list"
            },
            {
              "text": "Web",
              "link": "/features/web"
            }
          ]
        },
        {
          "text": "Overview",
          "collapsed": false,
          "items": [
            {
              "text": "Project Overview",
              "link": "/"
            },
            {
              "text": "Summary",
              "link": "/SUMMARY"
            },
            {
              "text": "Reference Index",
              "link": "/reference/"
            },
            {
              "text": "Design Overview",
              "link": "/design/"
            },
            {
              "text": "Basic Design",
              "link": "/design/basic-design"
            },
            {
              "text": "Detail Design",
              "link": "/design/detail-design"
            },
            {
              "text": "API Contracts",
              "link": "/design/api-contracts"
            },
            {
              "text": "Flow Catalog",
              "link": "/design/flows"
            },
            {
              "text": "Module Index",
              "link": "/reference/modules/"
            },
            {
              "text": "Workspace Index",
              "link": "/workspaces/"
            }
          ]
        }
      ],
      "/features/": [
        {
          "text": "Features",
          "collapsed": true,
          "items": [
            {
              "text": "Feature Catalog",
              "link": "/features/"
            },
            {
              "text": "Administration Login",
              "link": "/features/admin-login"
            },
            {
              "text": "Administration Notify",
              "link": "/features/admin-notify"
            },
            {
              "text": "Administration Read / List",
              "link": "/features/admin-list"
            },
            {
              "text": "Administration Verification",
              "link": "/features/admin-verify"
            },
            {
              "text": "Authentication Login",
              "link": "/features/auth-login"
            },
            {
              "text": "Authentication Password Reset",
              "link": "/features/auth-reset"
            },
            {
              "text": "Authentication Read / List",
              "link": "/features/auth-list"
            },
            {
              "text": "Authentication Verification",
              "link": "/features/auth-verify"
            },
            {
              "text": "Design",
              "link": "/features/design"
            },
            {
              "text": "Integrations Login",
              "link": "/features/integration-login"
            },
            {
              "text": "Integrations Notify",
              "link": "/features/integration-notify"
            },
            {
              "text": "Integrations Read / List",
              "link": "/features/integration-list"
            },
            {
              "text": "Integrations Verification",
              "link": "/features/integration-verify"
            },
            {
              "text": "Mobile",
              "link": "/features/mobile"
            },
            {
              "text": "Notifications Login",
              "link": "/features/notification-login"
            },
            {
              "text": "Notifications Notify",
              "link": "/features/notification-notify"
            },
            {
              "text": "Notifications Read / List",
              "link": "/features/notification-list"
            },
            {
              "text": "Notifications Verification",
              "link": "/features/notification-verify"
            },
            {
              "text": "Order Management Login",
              "link": "/features/order-login"
            },
            {
              "text": "Order Management Notify",
              "link": "/features/order-notify"
            },
            {
              "text": "Order Management Read / List",
              "link": "/features/order-list"
            },
            {
              "text": "Order Management Verification",
              "link": "/features/order-verify"
            },
            {
              "text": "Reporting Login",
              "link": "/features/reporting-login"
            },
            {
              "text": "Reporting Read / List",
              "link": "/features/reporting-list"
            },
            {
              "text": "Reporting Verification",
              "link": "/features/reporting-verify"
            },
            {
              "text": "Search Create",
              "link": "/features/search-create"
            },
            {
              "text": "Search Login",
              "link": "/features/search-login"
            },
            {
              "text": "Search Notify",
              "link": "/features/search-notify"
            },
            {
              "text": "Search Read / List",
              "link": "/features/search-list"
            },
            {
              "text": "Storage Login",
              "link": "/features/storage-login"
            },
            {
              "text": "Storage Notify",
              "link": "/features/storage-notify"
            },
            {
              "text": "Storage Read / List",
              "link": "/features/storage-list"
            },
            {
              "text": "Storage Verification",
              "link": "/features/storage-verify"
            },
            {
              "text": "User Management Create",
              "link": "/features/user-create"
            },
            {
              "text": "User Management Login",
              "link": "/features/user-login"
            },
            {
              "text": "User Management Notify",
              "link": "/features/user-notify"
            },
            {
              "text": "User Management Read / List",
              "link": "/features/user-list"
            },
            {
              "text": "Web",
              "link": "/features/web"
            }
          ]
        }
      ],
      "/design/": [
        {
          "text": "Design Docs",
          "collapsed": false,
          "items": [
            {
              "text": "Design Overview",
              "link": "/design/"
            },
            {
              "text": "Basic Design",
              "link": "/design/basic-design"
            },
            {
              "text": "Detail Design",
              "link": "/design/detail-design"
            },
            {
              "text": "API Contracts",
              "link": "/design/api-contracts"
            },
            {
              "text": "Flow Catalog",
              "link": "/design/flows"
            }
          ]
        }
      ],
      "/reference/": [
        {
          "text": "Reference",
          "collapsed": false,
          "items": [
            {
              "text": "Reference Index",
              "link": "/reference/"
            },
            {
              "text": "Module Index",
              "link": "/reference/modules/"
            }
          ]
        }
      ],
      "/reference/modules/": [
        {
          "text": "Modules",
          "collapsed": true,
          "items": [
            {
              "text": "Module Index",
              "link": "/reference/modules/"
            },
            {
              "text": "(root)",
              "link": "/reference/modules/root"
            },
            {
              "text": "mobile",
              "link": "/reference/modules/mobile"
            },
            {
              "text": "mobile/src",
              "link": "/reference/modules/mobile/src"
            },
            {
              "text": "api",
              "link": "/reference/modules/api"
            },
            {
              "text": "api/src",
              "link": "/reference/modules/api/src"
            },
            {
              "text": "mobile/src/features",
              "link": "/reference/modules/mobile/src/features"
            },
            {
              "text": "mobile/src/components",
              "link": "/reference/modules/mobile/src/components"
            },
            {
              "text": "mobile/src/domain",
              "link": "/reference/modules/mobile/src/domain"
            },
            {
              "text": "mobile/src/domain/usecases",
              "link": "/reference/modules/mobile/src/domain/usecases"
            },
            {
              "text": "api/src/store",
              "link": "/reference/modules/api/src/store"
            },
            {
              "text": "api/src/services",
              "link": "/reference/modules/api/src/services"
            },
            {
              "text": "mobile/app",
              "link": "/reference/modules/mobile/app"
            },
            {
              "text": "mobile/src/domain/usecases/modules",
              "link": "/reference/modules/mobile/src/domain/usecases/modules"
            },
            {
              "text": "mobile/src/components/atoms",
              "link": "/reference/modules/mobile/src/components/atoms"
            },
            {
              "text": "api/src/dto",
              "link": "/reference/modules/api/src/dto"
            },
            {
              "text": "mobile/src/core",
              "link": "/reference/modules/mobile/src/core"
            },
            {
              "text": "mobile/src/utils",
              "link": "/reference/modules/mobile/src/utils"
            },
            {
              "text": "mobile/src/theme",
              "link": "/reference/modules/mobile/src/theme"
            },
            {
              "text": "mobile/src/features/auth",
              "link": "/reference/modules/mobile/src/features/auth"
            },
            {
              "text": "mobile/src/features/auth/components",
              "link": "/reference/modules/mobile/src/features/auth/components"
            },
            {
              "text": "mobile/src/core/api",
              "link": "/reference/modules/mobile/src/core/api"
            },
            {
              "text": "mobile/src/data",
              "link": "/reference/modules/mobile/src/data"
            },
            {
              "text": "mobile/src/data/repositories",
              "link": "/reference/modules/mobile/src/data/repositories"
            },
            {
              "text": "design-builder",
              "link": "/reference/modules/design-builder"
            },
            {
              "text": "deploy",
              "link": "/reference/modules/deploy"
            },
            {
              "text": "design-builder/src",
              "link": "/reference/modules/design-builder/src"
            },
            {
              "text": "mobile/src/components/molecules",
              "link": "/reference/modules/mobile/src/components/molecules"
            },
            {
              "text": "mobile/src/domain/usecases/auth",
              "link": "/reference/modules/mobile/src/domain/usecases/auth"
            },
            {
              "text": "api/src/db",
              "link": "/reference/modules/api/src/db"
            },
            {
              "text": "mobile/src/features/timeline",
              "link": "/reference/modules/mobile/src/features/timeline"
            },
            {
              "text": "api/src/shared",
              "link": "/reference/modules/api/src/shared"
            },
            {
              "text": "mobile/src/features/home",
              "link": "/reference/modules/mobile/src/features/home"
            },
            {
              "text": "mobile/src/features/timeline/components",
              "link": "/reference/modules/mobile/src/features/timeline/components"
            },
            {
              "text": "api/src/utils",
              "link": "/reference/modules/api/src/utils"
            },
            {
              "text": "api/src/modules",
              "link": "/reference/modules/api/src/modules"
            },
            {
              "text": "mobile/src/features/home/components",
              "link": "/reference/modules/mobile/src/features/home/components"
            },
            {
              "text": "mobile/src/components/molecules/pickers",
              "link": "/reference/modules/mobile/src/components/molecules/pickers"
            },
            {
              "text": "mobile/app/(tabs)",
              "link": "/reference/modules/mobile/app/tabs--7761ed0d"
            },
            {
              "text": "deploy/k8s",
              "link": "/reference/modules/deploy/k8s"
            },
            {
              "text": "deploy/k8s-prod",
              "link": "/reference/modules/deploy/k8s-prod"
            },
            {
              "text": "mobile/assets",
              "link": "/reference/modules/mobile/assets"
            },
            {
              "text": "mobile/assets/lottie",
              "link": "/reference/modules/mobile/assets/lottie"
            },
            {
              "text": "api/src/middleware",
              "link": "/reference/modules/api/src/middleware"
            },
            {
              "text": "mobile/app/profile-details",
              "link": "/reference/modules/mobile/app/profile-details"
            },
            {
              "text": "mobile/src/features/budget",
              "link": "/reference/modules/mobile/src/features/budget"
            },
            {
              "text": "mobile/src/presentation",
              "link": "/reference/modules/mobile/src/presentation"
            },
            {
              "text": "mobile/src/presentation/hooks",
              "link": "/reference/modules/mobile/src/presentation/hooks"
            },
            {
              "text": "mobile/src/features/budget/components",
              "link": "/reference/modules/mobile/src/features/budget/components"
            },
            {
              "text": "mobile/src/animations",
              "link": "/reference/modules/mobile/src/animations"
            },
            {
              "text": "mobile/src/components/glass",
              "link": "/reference/modules/mobile/src/components/glass"
            },
            {
              "text": "mobile/src/features/mood",
              "link": "/reference/modules/mobile/src/features/mood"
            },
            {
              "text": "api/src/engines",
              "link": "/reference/modules/api/src/engines"
            },
            {
              "text": "api/src/shared/validators",
              "link": "/reference/modules/api/src/shared/validators"
            },
            {
              "text": "mobile/src/hooks",
              "link": "/reference/modules/mobile/src/hooks"
            },
            {
              "text": "design-builder/src/types",
              "link": "/reference/modules/design-builder/src/types"
            },
            {
              "text": "design-builder/src/components",
              "link": "/reference/modules/design-builder/src/components"
            },
            {
              "text": "deploy/k8s/base",
              "link": "/reference/modules/deploy/k8s/base"
            },
            {
              "text": "mobile/src/components/organisms",
              "link": "/reference/modules/mobile/src/components/organisms"
            },
            {
              "text": "deploy/k8s-prod/overlays",
              "link": "/reference/modules/deploy/k8s-prod/overlays"
            },
            {
              "text": "mobile/src/presentation/hooks/auth",
              "link": "/reference/modules/mobile/src/presentation/hooks/auth"
            },
            {
              "text": "mobile/src/domain/repositories",
              "link": "/reference/modules/mobile/src/domain/repositories"
            },
            {
              "text": "mobile/src/features/live",
              "link": "/reference/modules/mobile/src/features/live"
            },
            {
              "text": "mobile/src/features/mood/components",
              "link": "/reference/modules/mobile/src/features/mood/components"
            },
            {
              "text": "web",
              "link": "/reference/modules/web"
            },
            {
              "text": "mobile/src/theme/tokens",
              "link": "/reference/modules/mobile/src/theme/tokens"
            },
            {
              "text": "mobile/src/types",
              "link": "/reference/modules/mobile/src/types"
            },
            {
              "text": "mobile/ios",
              "link": "/reference/modules/mobile/ios"
            },
            {
              "text": "mobile/src/features/pairing",
              "link": "/reference/modules/mobile/src/features/pairing"
            },
            {
              "text": "mobile/src/framework",
              "link": "/reference/modules/mobile/src/framework"
            },
            {
              "text": "mobile/src/framework/ctx",
              "link": "/reference/modules/mobile/src/framework/ctx"
            },
            {
              "text": "api/src/config",
              "link": "/reference/modules/api/src/config"
            },
            {
              "text": "api/src/oauth",
              "link": "/reference/modules/api/src/oauth"
            },
            {
              "text": "api/src/__tests__",
              "link": "/reference/modules/api/src/__tests__"
            },
            {
              "text": "mobile/ios/Em",
              "link": "/reference/modules/mobile/ios/Em"
            },
            {
              "text": "web/src",
              "link": "/reference/modules/web/src"
            },
            {
              "text": "mobile/src/core/common",
              "link": "/reference/modules/mobile/src/core/common"
            },
            {
              "text": "design-builder/src/components/ui",
              "link": "/reference/modules/design-builder/src/components/ui"
            },
            {
              "text": "deploy/k8s-prod/base",
              "link": "/reference/modules/deploy/k8s-prod/base"
            },
            {
              "text": "deploy/k8s-prod/overlays/prod",
              "link": "/reference/modules/deploy/k8s-prod/overlays/prod"
            },
            {
              "text": "deploy/k8s-prod/overlays/staging",
              "link": "/reference/modules/deploy/k8s-prod/overlays/staging"
            },
            {
              "text": "mobile/ios/Em/Images.xcassets",
              "link": "/reference/modules/mobile/ios/Em/Images.xcassets"
            },
            {
              "text": "mobile/scripts",
              "link": "/reference/modules/mobile/scripts"
            },
            {
              "text": "mobile/src/features/profile",
              "link": "/reference/modules/mobile/src/features/profile"
            },
            {
              "text": "mobile/src/features/profile/components",
              "link": "/reference/modules/mobile/src/features/profile/components"
            },
            {
              "text": "mobile/src/lib",
              "link": "/reference/modules/mobile/src/lib"
            },
            {
              "text": "deploy/k8s/jobs",
              "link": "/reference/modules/deploy/k8s/jobs"
            },
            {
              "text": "deploy/k8s/observability",
              "link": "/reference/modules/deploy/k8s/observability"
            },
            {
              "text": "design-builder/src/app",
              "link": "/reference/modules/design-builder/src/app"
            },
            {
              "text": "mobile/src/presentation/hooks/notifications",
              "link": "/reference/modules/mobile/src/presentation/hooks/notifications"
            },
            {
              "text": "mobile/android",
              "link": "/reference/modules/mobile/android"
            },
            {
              "text": "mobile/android/app",
              "link": "/reference/modules/mobile/android/app"
            },
            {
              "text": "mobile/android/app/src",
              "link": "/reference/modules/mobile/android/app/src"
            },
            {
              "text": "mobile/android/app/src/main",
              "link": "/reference/modules/mobile/android/app/src/main"
            },
            {
              "text": "mobile/android/app/src/main/java",
              "link": "/reference/modules/mobile/android/app/src/main/java"
            },
            {
              "text": "mobile/android/app/src/main/java/com",
              "link": "/reference/modules/mobile/android/app/src/main/java/com"
            },
            {
              "text": "mobile/android/app/src/main/java/com/truongdq",
              "link": "/reference/modules/mobile/android/app/src/main/java/com/truongdq"
            },
            {
              "text": "mobile/android/app/src/main/java/com/truongdq/emplus",
              "link": "/reference/modules/mobile/android/app/src/main/java/com/truongdq/emplus"
            },
            {
              "text": "mobile/src/features/timeline/hooks",
              "link": "/reference/modules/mobile/src/features/timeline/hooks"
            },
            {
              "text": "mobile/src/features/home/hooks",
              "link": "/reference/modules/mobile/src/features/home/hooks"
            },
            {
              "text": "mobile/src/features/notifications",
              "link": "/reference/modules/mobile/src/features/notifications"
            },
            {
              "text": "mobile/src/core/config",
              "link": "/reference/modules/mobile/src/core/config"
            },
            {
              "text": "api/grafana",
              "link": "/reference/modules/api/grafana"
            },
            {
              "text": "api/grafana/provisioning",
              "link": "/reference/modules/api/grafana/provisioning"
            },
            {
              "text": "api/grafana/provisioning/datasources",
              "link": "/reference/modules/api/grafana/provisioning/datasources"
            },
            {
              "text": "api/loki",
              "link": "/reference/modules/api/loki"
            },
            {
              "text": "deploy/k8s-prod/cluster",
              "link": "/reference/modules/deploy/k8s-prod/cluster"
            },
            {
              "text": "deploy/k8s-prod/jobs",
              "link": "/reference/modules/deploy/k8s-prod/jobs"
            },
            {
              "text": "deploy/kind",
              "link": "/reference/modules/deploy/kind"
            },
            {
              "text": "design-builder/src/lib",
              "link": "/reference/modules/design-builder/src/lib"
            },
            {
              "text": "design-builder/src/page-components",
              "link": "/reference/modules/design-builder/src/page-components"
            },
            {
              "text": "design-builder/src/store",
              "link": "/reference/modules/design-builder/src/store"
            },
            {
              "text": "mobile/app/memory",
              "link": "/reference/modules/mobile/app/memory"
            },
            {
              "text": "mobile/ios/Em/Images.xcassets/AppIcon.appiconset",
              "link": "/reference/modules/mobile/ios/Em/Images.xcassets/AppIcon.appiconset"
            },
            {
              "text": "mobile/ios/Em/Images.xcassets/SplashScreenBackground.colorset",
              "link": "/reference/modules/mobile/ios/Em/Images.xcassets/SplashScreenBackground.colorset"
            },
            {
              "text": "mobile/ios/Em/Images.xcassets/SplashScreenLegacy.imageset",
              "link": "/reference/modules/mobile/ios/Em/Images.xcassets/SplashScreenLegacy.imageset"
            },
            {
              "text": "mobile/src/features/auth/hooks",
              "link": "/reference/modules/mobile/src/features/auth/hooks"
            },
            {
              "text": "mobile/src/features/budget/hooks",
              "link": "/reference/modules/mobile/src/features/budget/hooks"
            },
            {
              "text": "mobile/src/features/timeline/screens",
              "link": "/reference/modules/mobile/src/features/timeline/screens"
            },
            {
              "text": "mobile/src/lottie",
              "link": "/reference/modules/mobile/src/lottie"
            },
            {
              "text": "web/src/lib",
              "link": "/reference/modules/web/src/lib"
            },
            {
              "text": "web/src/pages",
              "link": "/reference/modules/web/src/pages"
            },
            {
              "text": "web/src/styles",
              "link": "/reference/modules/web/src/styles"
            },
            {
              "text": "api/scripts",
              "link": "/reference/modules/api/scripts"
            },
            {
              "text": "api/src/constants",
              "link": "/reference/modules/api/src/constants"
            },
            {
              "text": "mobile/src/components/templates",
              "link": "/reference/modules/mobile/src/components/templates"
            },
            {
              "text": "mobile/src/framework/di",
              "link": "/reference/modules/mobile/src/framework/di"
            }
          ]
        }
      ],
      "/workspaces/": [
        {
          "text": "Workspaces",
          "collapsed": false,
          "items": [
            {
              "text": "Workspace Index",
              "link": "/workspaces/"
            },
            {
              "text": "emplus",
              "link": "/workspaces/root"
            },
            {
              "text": "@emplus/api",
              "link": "/workspaces/api"
            },
            {
              "text": "@emplus/design-builder",
              "link": "/workspaces/design-builder"
            },
            {
              "text": "@emplus/mobile",
              "link": "/workspaces/mobile"
            },
            {
              "text": "@emplus/web",
              "link": "/workspaces/web"
            }
          ]
        }
      ],
      "/reference/files/": [
        {
          "text": "(root)",
          "collapsed": false,
          "items": [
            {
              "text": "docker-compose.yml",
              "link": "/reference/files/docker-compose.yml"
            },
            {
              "text": "package.json",
              "link": "/reference/files/package.json"
            },
            {
              "text": "skills-lock.json",
              "link": "/reference/files/skills-lock.json"
            }
          ]
        },
        {
          "text": "api",
          "collapsed": true,
          "items": [
            {
              "text": "api/docker-compose.logging.yml",
              "link": "/reference/files/api/docker-compose.logging.yml"
            },
            {
              "text": "api/grafana/provisioning/datasources/datasources.yml",
              "link": "/reference/files/api/grafana/provisioning/datasources/datasources.yml"
            },
            {
              "text": "api/loki/config.yml",
              "link": "/reference/files/api/loki/config.yml"
            },
            {
              "text": "api/openapi.json",
              "link": "/reference/files/api/openapi.json"
            },
            {
              "text": "api/package.json",
              "link": "/reference/files/api/package.json"
            },
            {
              "text": "api/scripts/export-openapi.ts",
              "link": "/reference/files/api/scripts/export-openapi.ts"
            },
            {
              "text": "api/src/__tests__/anniversary.test.ts",
              "link": "/reference/files/api/src/__tests__/anniversary.test.ts"
            },
            {
              "text": "api/src/__tests__/app.test.ts",
              "link": "/reference/files/api/src/__tests__/app.test.ts"
            },
            {
              "text": "api/src/__tests__/auth.test.ts",
              "link": "/reference/files/api/src/__tests__/auth.test.ts"
            },
            {
              "text": "api/src/__tests__/love-days-utc.test.ts",
              "link": "/reference/files/api/src/__tests__/love-days-utc.test.ts"
            },
            {
              "text": "api/src/__tests__/notifications.test.ts",
              "link": "/reference/files/api/src/__tests__/notifications.test.ts"
            },
            {
              "text": "api/src/__tests__/security_random.test.ts",
              "link": "/reference/files/api/src/__tests__/security_random.test.ts"
            },
            {
              "text": "api/src/__tests__/system.test.ts",
              "link": "/reference/files/api/src/__tests__/system.test.ts"
            },
            {
              "text": "api/src/__tests__/validation.test.ts",
              "link": "/reference/files/api/src/__tests__/validation.test.ts"
            },
            {
              "text": "api/src/app-env.ts",
              "link": "/reference/files/api/src/app-env.ts"
            },
            {
              "text": "api/src/app.ts",
              "link": "/reference/files/api/src/app.ts"
            },
            {
              "text": "api/src/config/env.ts",
              "link": "/reference/files/api/src/config/env.ts"
            },
            {
              "text": "api/src/constants/index.ts",
              "link": "/reference/files/api/src/constants/index.ts"
            },
            {
              "text": "api/src/db/bootstrap.ts",
              "link": "/reference/files/api/src/db/bootstrap.ts"
            },
            {
              "text": "api/src/db/migrate.ts",
              "link": "/reference/files/api/src/db/migrate.ts"
            },
            {
              "text": "api/src/db/seed-custom.ts",
              "link": "/reference/files/api/src/db/seed-custom.ts"
            },
            {
              "text": "api/src/db/seed.ts",
              "link": "/reference/files/api/src/db/seed.ts"
            },
            {
              "text": "api/src/dto/auth.dto.ts",
              "link": "/reference/files/api/src/dto/auth.dto.ts"
            },
            {
              "text": "api/src/dto/budget.dto.ts",
              "link": "/reference/files/api/src/dto/budget.dto.ts"
            },
            {
              "text": "api/src/dto/care.dto.ts",
              "link": "/reference/files/api/src/dto/care.dto.ts"
            },
            {
              "text": "api/src/dto/couples.dto.ts",
              "link": "/reference/files/api/src/dto/couples.dto.ts"
            },
            {
              "text": "api/src/dto/live.dto.ts",
              "link": "/reference/files/api/src/dto/live.dto.ts"
            },
            {
              "text": "api/src/dto/notifications.dto.ts",
              "link": "/reference/files/api/src/dto/notifications.dto.ts"
            },
            {
              "text": "api/src/dto/timeline.dto.ts",
              "link": "/reference/files/api/src/dto/timeline.dto.ts"
            },
            {
              "text": "api/src/dto/user.dto.ts",
              "link": "/reference/files/api/src/dto/user.dto.ts"
            },
            {
              "text": "api/src/engines/anniversary.ts",
              "link": "/reference/files/api/src/engines/anniversary.ts"
            },
            {
              "text": "api/src/engines/emotional.ts",
              "link": "/reference/files/api/src/engines/emotional.ts"
            },
            {
              "text": "api/src/index.ts",
              "link": "/reference/files/api/src/index.ts"
            },
            {
              "text": "api/src/middleware/auth.ts",
              "link": "/reference/files/api/src/middleware/auth.ts"
            },
            {
              "text": "api/src/middleware/cors.ts",
              "link": "/reference/files/api/src/middleware/cors.ts"
            },
            {
              "text": "api/src/middleware/rate-limit.ts",
              "link": "/reference/files/api/src/middleware/rate-limit.ts"
            },
            {
              "text": "api/src/middleware/sanitize.ts",
              "link": "/reference/files/api/src/middleware/sanitize.ts"
            },
            {
              "text": "api/src/middleware/security.ts",
              "link": "/reference/files/api/src/middleware/security.ts"
            },
            {
              "text": "api/src/modules/admin.ts",
              "link": "/reference/files/api/src/modules/admin.ts"
            },
            {
              "text": "api/src/modules/auth.ts",
              "link": "/reference/files/api/src/modules/auth.ts"
            },
            {
              "text": "api/src/modules/budget.ts",
              "link": "/reference/files/api/src/modules/budget.ts"
            },
            {
              "text": "api/src/modules/care.ts",
              "link": "/reference/files/api/src/modules/care.ts"
            },
            {
              "text": "api/src/modules/couples.ts",
              "link": "/reference/files/api/src/modules/couples.ts"
            },
            {
              "text": "api/src/modules/dashboard.ts",
              "link": "/reference/files/api/src/modules/dashboard.ts"
            },
            {
              "text": "api/src/modules/debug.ts",
              "link": "/reference/files/api/src/modules/debug.ts"
            },
            {
              "text": "api/src/modules/demo-in-app-notifications.ts",
              "link": "/reference/files/api/src/modules/demo-in-app-notifications.ts"
            },
            {
              "text": "api/src/modules/demo-timeline-memories.ts",
              "link": "/reference/files/api/src/modules/demo-timeline-memories.ts"
            },
            {
              "text": "api/src/modules/index.ts",
              "link": "/reference/files/api/src/modules/index.ts"
            },
            {
              "text": "api/src/modules/live.ts",
              "link": "/reference/files/api/src/modules/live.ts"
            },
            {
              "text": "api/src/modules/media.ts",
              "link": "/reference/files/api/src/modules/media.ts"
            },
            {
              "text": "api/src/modules/notifications.ts",
              "link": "/reference/files/api/src/modules/notifications.ts"
            },
            {
              "text": "api/src/modules/system.ts",
              "link": "/reference/files/api/src/modules/system.ts"
            },
            {
              "text": "api/src/modules/timeline.ts",
              "link": "/reference/files/api/src/modules/timeline.ts"
            },
            {
              "text": "api/src/modules/user.ts",
              "link": "/reference/files/api/src/modules/user.ts"
            },
            {
              "text": "api/src/oauth/verify.ts",
              "link": "/reference/files/api/src/oauth/verify.ts"
            },
            {
              "text": "api/src/services/auth.service.ts",
              "link": "/reference/files/api/src/services/auth.service.ts"
            },
            {
              "text": "api/src/services/budget.service.ts",
              "link": "/reference/files/api/src/services/budget.service.ts"
            },
            {
              "text": "api/src/services/couple.service.ts",
              "link": "/reference/files/api/src/services/couple.service.ts"
            },
            {
              "text": "api/src/services/crypto.ts",
              "link": "/reference/files/api/src/services/crypto.ts"
            },
            {
              "text": "api/src/services/dependencies.ts",
              "link": "/reference/files/api/src/services/dependencies.ts"
            },
            {
              "text": "api/src/services/mail.ts",
              "link": "/reference/files/api/src/services/mail.ts"
            },
            {
              "text": "api/src/services/media-storage.ts",
              "link": "/reference/files/api/src/services/media-storage.ts"
            },
            {
              "text": "api/src/services/notification.service.ts",
              "link": "/reference/files/api/src/services/notification.service.ts"
            },
            {
              "text": "api/src/services/push.ts",
              "link": "/reference/files/api/src/services/push.ts"
            },
            {
              "text": "api/src/services/session-cleanup.ts",
              "link": "/reference/files/api/src/services/session-cleanup.ts"
            },
            {
              "text": "api/src/services/user.service.ts",
              "link": "/reference/files/api/src/services/user.service.ts"
            },
            {
              "text": "api/src/shared/code.ts",
              "link": "/reference/files/api/src/shared/code.ts"
            },
            {
              "text": "api/src/shared/date.ts",
              "link": "/reference/files/api/src/shared/date.ts"
            },
            {
              "text": "api/src/shared/token.ts",
              "link": "/reference/files/api/src/shared/token.ts"
            },
            {
              "text": "api/src/shared/validators/index.ts",
              "link": "/reference/files/api/src/shared/validators/index.ts"
            },
            {
              "text": "api/src/shared/validators/zod.ts",
              "link": "/reference/files/api/src/shared/validators/zod.ts"
            },
            {
              "text": "api/src/store.ts",
              "link": "/reference/files/api/src/store.ts"
            },
            {
              "text": "api/src/store/contracts.ts",
              "link": "/reference/files/api/src/store/contracts.ts"
            },
            {
              "text": "api/src/store/in-memory-store.ts",
              "link": "/reference/files/api/src/store/in-memory-store.ts"
            },
            {
              "text": "api/src/store/index.ts",
              "link": "/reference/files/api/src/store/index.ts"
            },
            {
              "text": "api/src/types.ts",
              "link": "/reference/files/api/src/types.ts"
            },
            {
              "text": "api/src/utils/couple.ts",
              "link": "/reference/files/api/src/utils/couple.ts"
            },
            {
              "text": "api/src/utils/date.ts",
              "link": "/reference/files/api/src/utils/date.ts"
            },
            {
              "text": "api/src/utils/http.ts",
              "link": "/reference/files/api/src/utils/http.ts"
            },
            {
              "text": "api/src/utils/logger.ts",
              "link": "/reference/files/api/src/utils/logger.ts"
            },
            {
              "text": "api/src/utils/password.ts",
              "link": "/reference/files/api/src/utils/password.ts"
            },
            {
              "text": "api/src/utils/presentation.ts",
              "link": "/reference/files/api/src/utils/presentation.ts"
            },
            {
              "text": "api/tsconfig.json",
              "link": "/reference/files/api/tsconfig.json"
            }
          ]
        },
        {
          "text": "deploy/k8s-prod/base",
          "collapsed": false,
          "items": [
            {
              "text": "deploy/k8s-prod/base/api.yaml",
              "link": "/reference/files/deploy/k8s-prod/base/api.yaml"
            },
            {
              "text": "deploy/k8s-prod/base/ingress.yaml",
              "link": "/reference/files/deploy/k8s-prod/base/ingress.yaml"
            },
            {
              "text": "deploy/k8s-prod/base/kustomization.yaml",
              "link": "/reference/files/deploy/k8s-prod/base/kustomization.yaml"
            },
            {
              "text": "deploy/k8s-prod/base/service.yaml",
              "link": "/reference/files/deploy/k8s-prod/base/service.yaml"
            }
          ]
        },
        {
          "text": "deploy/k8s-prod/cluster",
          "collapsed": false,
          "items": [
            {
              "text": "deploy/k8s-prod/cluster/clusterissuer.yaml",
              "link": "/reference/files/deploy/k8s-prod/cluster/clusterissuer.yaml"
            }
          ]
        },
        {
          "text": "deploy/k8s-prod/jobs",
          "collapsed": false,
          "items": [
            {
              "text": "deploy/k8s-prod/jobs/db-migrate-job.yaml",
              "link": "/reference/files/deploy/k8s-prod/jobs/db-migrate-job.yaml"
            }
          ]
        },
        {
          "text": "deploy/k8s-prod/overlays/prod",
          "collapsed": false,
          "items": [
            {
              "text": "deploy/k8s-prod/overlays/prod/configmap.yaml",
              "link": "/reference/files/deploy/k8s-prod/overlays/prod/configmap.yaml"
            },
            {
              "text": "deploy/k8s-prod/overlays/prod/ingress.patch.yaml",
              "link": "/reference/files/deploy/k8s-prod/overlays/prod/ingress.patch.yaml"
            },
            {
              "text": "deploy/k8s-prod/overlays/prod/kustomization.yaml",
              "link": "/reference/files/deploy/k8s-prod/overlays/prod/kustomization.yaml"
            },
            {
              "text": "deploy/k8s-prod/overlays/prod/namespace.yaml",
              "link": "/reference/files/deploy/k8s-prod/overlays/prod/namespace.yaml"
            }
          ]
        },
        {
          "text": "deploy/k8s-prod/overlays/staging",
          "collapsed": false,
          "items": [
            {
              "text": "deploy/k8s-prod/overlays/staging/configmap.yaml",
              "link": "/reference/files/deploy/k8s-prod/overlays/staging/configmap.yaml"
            },
            {
              "text": "deploy/k8s-prod/overlays/staging/ingress.patch.yaml",
              "link": "/reference/files/deploy/k8s-prod/overlays/staging/ingress.patch.yaml"
            },
            {
              "text": "deploy/k8s-prod/overlays/staging/kustomization.yaml",
              "link": "/reference/files/deploy/k8s-prod/overlays/staging/kustomization.yaml"
            },
            {
              "text": "deploy/k8s-prod/overlays/staging/namespace.yaml",
              "link": "/reference/files/deploy/k8s-prod/overlays/staging/namespace.yaml"
            }
          ]
        },
        {
          "text": "deploy/k8s/base",
          "collapsed": false,
          "items": [
            {
              "text": "deploy/k8s/base/api.yaml",
              "link": "/reference/files/deploy/k8s/base/api.yaml"
            },
            {
              "text": "deploy/k8s/base/configmap-api.yaml",
              "link": "/reference/files/deploy/k8s/base/configmap-api.yaml"
            },
            {
              "text": "deploy/k8s/base/kustomization.yaml",
              "link": "/reference/files/deploy/k8s/base/kustomization.yaml"
            },
            {
              "text": "deploy/k8s/base/mailpit.yaml",
              "link": "/reference/files/deploy/k8s/base/mailpit.yaml"
            },
            {
              "text": "deploy/k8s/base/minio.yaml",
              "link": "/reference/files/deploy/k8s/base/minio.yaml"
            },
            {
              "text": "deploy/k8s/base/namespace.yaml",
              "link": "/reference/files/deploy/k8s/base/namespace.yaml"
            },
            {
              "text": "deploy/k8s/base/postgres.yaml",
              "link": "/reference/files/deploy/k8s/base/postgres.yaml"
            },
            {
              "text": "deploy/k8s/base/redis.yaml",
              "link": "/reference/files/deploy/k8s/base/redis.yaml"
            },
            {
              "text": "deploy/k8s/base/secret.yaml",
              "link": "/reference/files/deploy/k8s/base/secret.yaml"
            }
          ]
        },
        {
          "text": "deploy/k8s/jobs",
          "collapsed": false,
          "items": [
            {
              "text": "deploy/k8s/jobs/db-init-job.yaml",
              "link": "/reference/files/deploy/k8s/jobs/db-init-job.yaml"
            },
            {
              "text": "deploy/k8s/jobs/db-seed-job.yaml",
              "link": "/reference/files/deploy/k8s/jobs/db-seed-job.yaml"
            },
            {
              "text": "deploy/k8s/jobs/minio-bootstrap-job.yaml",
              "link": "/reference/files/deploy/k8s/jobs/minio-bootstrap-job.yaml"
            }
          ]
        },
        {
          "text": "deploy/k8s/observability",
          "collapsed": false,
          "items": [
            {
              "text": "deploy/k8s/observability/kube-prometheus-stack-values.yaml",
              "link": "/reference/files/deploy/k8s/observability/kube-prometheus-stack-values.yaml"
            },
            {
              "text": "deploy/k8s/observability/loki-values.yaml",
              "link": "/reference/files/deploy/k8s/observability/loki-values.yaml"
            },
            {
              "text": "deploy/k8s/observability/promtail-values.yaml",
              "link": "/reference/files/deploy/k8s/observability/promtail-values.yaml"
            }
          ]
        },
        {
          "text": "deploy/kind",
          "collapsed": false,
          "items": [
            {
              "text": "deploy/kind/kind-config.yaml",
              "link": "/reference/files/deploy/kind/kind-config.yaml"
            }
          ]
        },
        {
          "text": "design-builder",
          "collapsed": true,
          "items": [
            {
              "text": "design-builder/components.json",
              "link": "/reference/files/design-builder/components.json"
            },
            {
              "text": "design-builder/next-env.d.ts",
              "link": "/reference/files/design-builder/next-env.d.ts"
            },
            {
              "text": "design-builder/next.config.js",
              "link": "/reference/files/design-builder/next.config.js"
            },
            {
              "text": "design-builder/package.json",
              "link": "/reference/files/design-builder/package.json"
            },
            {
              "text": "design-builder/postcss.config.js",
              "link": "/reference/files/design-builder/postcss.config.js"
            },
            {
              "text": "design-builder/src/App.tsx",
              "link": "/reference/files/design-builder/src/App.tsx"
            },
            {
              "text": "design-builder/src/app/globals.css",
              "link": "/reference/files/design-builder/src/app/globals.css"
            },
            {
              "text": "design-builder/src/app/layout.tsx",
              "link": "/reference/files/design-builder/src/app/layout.tsx"
            },
            {
              "text": "design-builder/src/app/page.tsx",
              "link": "/reference/files/design-builder/src/app/page.tsx"
            },
            {
              "text": "design-builder/src/components/export-dialog.tsx",
              "link": "/reference/files/design-builder/src/components/export-dialog.tsx"
            },
            {
              "text": "design-builder/src/components/theme-preview.tsx",
              "link": "/reference/files/design-builder/src/components/theme-preview.tsx"
            },
            {
              "text": "design-builder/src/components/token-category-list.tsx",
              "link": "/reference/files/design-builder/src/components/token-category-list.tsx"
            },
            {
              "text": "design-builder/src/components/token-editor.tsx",
              "link": "/reference/files/design-builder/src/components/token-editor.tsx"
            },
            {
              "text": "design-builder/src/components/ui/button.tsx",
              "link": "/reference/files/design-builder/src/components/ui/button.tsx"
            },
            {
              "text": "design-builder/src/components/ui/card.tsx",
              "link": "/reference/files/design-builder/src/components/ui/card.tsx"
            },
            {
              "text": "design-builder/src/components/ui/input.tsx",
              "link": "/reference/files/design-builder/src/components/ui/input.tsx"
            },
            {
              "text": "design-builder/src/components/ui/label.tsx",
              "link": "/reference/files/design-builder/src/components/ui/label.tsx"
            },
            {
              "text": "design-builder/src/components/ui/scroll-area.tsx",
              "link": "/reference/files/design-builder/src/components/ui/scroll-area.tsx"
            },
            {
              "text": "design-builder/src/components/ui/sonner.tsx",
              "link": "/reference/files/design-builder/src/components/ui/sonner.tsx"
            },
            {
              "text": "design-builder/src/components/ui/switch.tsx",
              "link": "/reference/files/design-builder/src/components/ui/switch.tsx"
            },
            {
              "text": "design-builder/src/components/ui/tabs.tsx",
              "link": "/reference/files/design-builder/src/components/ui/tabs.tsx"
            },
            {
              "text": "design-builder/src/index.css",
              "link": "/reference/files/design-builder/src/index.css"
            },
            {
              "text": "design-builder/src/lib/utils.ts",
              "link": "/reference/files/design-builder/src/lib/utils.ts"
            },
            {
              "text": "design-builder/src/main.tsx",
              "link": "/reference/files/design-builder/src/main.tsx"
            },
            {
              "text": "design-builder/src/page-components/builder-page.tsx",
              "link": "/reference/files/design-builder/src/page-components/builder-page.tsx"
            },
            {
              "text": "design-builder/src/store/builder-store.ts",
              "link": "/reference/files/design-builder/src/store/builder-store.ts"
            },
            {
              "text": "design-builder/src/types/tokens.ts",
              "link": "/reference/files/design-builder/src/types/tokens.ts"
            },
            {
              "text": "design-builder/tailwind.config.js",
              "link": "/reference/files/design-builder/tailwind.config.js"
            },
            {
              "text": "design-builder/tsconfig.json",
              "link": "/reference/files/design-builder/tsconfig.json"
            },
            {
              "text": "design-builder/tsconfig.node.json",
              "link": "/reference/files/design-builder/tsconfig.node.json"
            },
            {
              "text": "design-builder/vite.config.ts",
              "link": "/reference/files/design-builder/vite.config.ts"
            }
          ]
        },
        {
          "text": "mobile",
          "collapsed": true,
          "items": [
            {
              "text": "mobile/android/app/src/main/java/com/truongdq/emplus/MainActivity.kt",
              "link": "/reference/files/mobile/android/app/src/main/java/com/truongdq/emplus/MainActivity.kt"
            },
            {
              "text": "mobile/android/app/src/main/java/com/truongdq/emplus/MainApplication.kt",
              "link": "/reference/files/mobile/android/app/src/main/java/com/truongdq/emplus/MainApplication.kt"
            },
            {
              "text": "mobile/app.json",
              "link": "/reference/files/mobile/app.json"
            },
            {
              "text": "mobile/app/_layout.tsx",
              "link": "/reference/files/mobile/app/_layout.tsx"
            },
            {
              "text": "mobile/app/(tabs)/_layout.tsx",
              "link": "/reference/files/mobile/app/tabs--7761ed0d/_layout.tsx"
            },
            {
              "text": "mobile/app/(tabs)/care.tsx",
              "link": "/reference/files/mobile/app/tabs--7761ed0d/care.tsx"
            },
            {
              "text": "mobile/app/(tabs)/home.tsx",
              "link": "/reference/files/mobile/app/tabs--7761ed0d/home.tsx"
            },
            {
              "text": "mobile/app/(tabs)/notifications.tsx",
              "link": "/reference/files/mobile/app/tabs--7761ed0d/notifications.tsx"
            },
            {
              "text": "mobile/app/(tabs)/profile.tsx",
              "link": "/reference/files/mobile/app/tabs--7761ed0d/profile.tsx"
            },
            {
              "text": "mobile/app/(tabs)/timeline.tsx",
              "link": "/reference/files/mobile/app/tabs--7761ed0d/timeline.tsx"
            },
            {
              "text": "mobile/app/add-expense.tsx",
              "link": "/reference/files/mobile/app/add-expense.tsx"
            },
            {
              "text": "mobile/app/add-memory.tsx",
              "link": "/reference/files/mobile/app/add-memory.tsx"
            },
            {
              "text": "mobile/app/forgot-password.tsx",
              "link": "/reference/files/mobile/app/forgot-password.tsx"
            },
            {
              "text": "mobile/app/index.tsx",
              "link": "/reference/files/mobile/app/index.tsx"
            },
            {
              "text": "mobile/app/login.tsx",
              "link": "/reference/files/mobile/app/login.tsx"
            },
            {
              "text": "mobile/app/memory/[id].tsx",
              "link": "/reference/files/mobile/app/memory/param-id--bb6303db.tsx"
            },
            {
              "text": "mobile/app/pairing.tsx",
              "link": "/reference/files/mobile/app/pairing.tsx"
            },
            {
              "text": "mobile/app/policy.tsx",
              "link": "/reference/files/mobile/app/policy.tsx"
            },
            {
              "text": "mobile/app/profile-details/appearance.tsx",
              "link": "/reference/files/mobile/app/profile-details/appearance.tsx"
            },
            {
              "text": "mobile/app/profile-details/help.tsx",
              "link": "/reference/files/mobile/app/profile-details/help.tsx"
            },
            {
              "text": "mobile/app/profile-details/notifications.tsx",
              "link": "/reference/files/mobile/app/profile-details/notifications.tsx"
            },
            {
              "text": "mobile/app/profile-details/personal-info.tsx",
              "link": "/reference/files/mobile/app/profile-details/personal-info.tsx"
            },
            {
              "text": "mobile/app/profile-details/privacy.tsx",
              "link": "/reference/files/mobile/app/profile-details/privacy.tsx"
            },
            {
              "text": "mobile/app/register.tsx",
              "link": "/reference/files/mobile/app/register.tsx"
            },
            {
              "text": "mobile/app/reset-password.tsx",
              "link": "/reference/files/mobile/app/reset-password.tsx"
            },
            {
              "text": "mobile/app/theme-showcase.tsx",
              "link": "/reference/files/mobile/app/theme-showcase.tsx"
            },
            {
              "text": "mobile/app/verify-otp.tsx",
              "link": "/reference/files/mobile/app/verify-otp.tsx"
            },
            {
              "text": "mobile/assets/lottie/care-heart.json",
              "link": "/reference/files/mobile/assets/lottie/care-heart.json"
            },
            {
              "text": "mobile/assets/lottie/empty.json",
              "link": "/reference/files/mobile/assets/lottie/empty.json"
            },
            {
              "text": "mobile/assets/lottie/error.json",
              "link": "/reference/files/mobile/assets/lottie/error.json"
            },
            {
              "text": "mobile/assets/lottie/home-counter-bird-pair-sky.json",
              "link": "/reference/files/mobile/assets/lottie/home-counter-bird-pair-sky.json"
            },
            {
              "text": "mobile/assets/lottie/loader.json",
              "link": "/reference/files/mobile/assets/lottie/loader.json"
            },
            {
              "text": "mobile/assets/lottie/login-cat-love.json",
              "link": "/reference/files/mobile/assets/lottie/login-cat-love.json"
            },
            {
              "text": "mobile/assets/lottie/notifications-empty-cat.json",
              "link": "/reference/files/mobile/assets/lottie/notifications-empty-cat.json"
            },
            {
              "text": "mobile/assets/lottie/pairing-family-love.json",
              "link": "/reference/files/mobile/assets/lottie/pairing-family-love.json"
            },
            {
              "text": "mobile/assets/lottie/placeholder.json",
              "link": "/reference/files/mobile/assets/lottie/placeholder.json"
            },
            {
              "text": "mobile/assets/lottie/register-love-hearts.json",
              "link": "/reference/files/mobile/assets/lottie/register-love-hearts.json"
            },
            {
              "text": "mobile/assets/lottie/success.json",
              "link": "/reference/files/mobile/assets/lottie/success.json"
            },
            {
              "text": "mobile/assets/lottie/timeline-empty-love.json",
              "link": "/reference/files/mobile/assets/lottie/timeline-empty-love.json"
            },
            {
              "text": "mobile/assets/lottie/verify-otp-password-auth.json",
              "link": "/reference/files/mobile/assets/lottie/verify-otp-password-auth.json"
            },
            {
              "text": "mobile/babel.config.js",
              "link": "/reference/files/mobile/babel.config.js"
            },
            {
              "text": "mobile/eas.json",
              "link": "/reference/files/mobile/eas.json"
            },
            {
              "text": "mobile/index.js",
              "link": "/reference/files/mobile/index.js"
            },
            {
              "text": "mobile/ios/Em/AppDelegate.swift",
              "link": "/reference/files/mobile/ios/Em/AppDelegate.swift"
            },
            {
              "text": "mobile/ios/Em/Images.xcassets/AppIcon.appiconset/Contents.json",
              "link": "/reference/files/mobile/ios/Em/Images.xcassets/AppIcon.appiconset/Contents.json"
            },
            {
              "text": "mobile/ios/Em/Images.xcassets/Contents.json",
              "link": "/reference/files/mobile/ios/Em/Images.xcassets/Contents.json"
            },
            {
              "text": "mobile/ios/Em/Images.xcassets/SplashScreenBackground.colorset/Contents.json",
              "link": "/reference/files/mobile/ios/Em/Images.xcassets/SplashScreenBackground.colorset/Contents.json"
            },
            {
              "text": "mobile/ios/Em/Images.xcassets/SplashScreenLegacy.imageset/Contents.json",
              "link": "/reference/files/mobile/ios/Em/Images.xcassets/SplashScreenLegacy.imageset/Contents.json"
            },
            {
              "text": "mobile/ios/Podfile.properties.json",
              "link": "/reference/files/mobile/ios/Podfile.properties.json"
            },
            {
              "text": "mobile/metro.config.js",
              "link": "/reference/files/mobile/metro.config.js"
            },
            {
              "text": "mobile/package.json",
              "link": "/reference/files/mobile/package.json"
            },
            {
              "text": "mobile/scripts/fix-flow-syntax.js",
              "link": "/reference/files/mobile/scripts/fix-flow-syntax.js"
            },
            {
              "text": "mobile/scripts/sync-api.ts",
              "link": "/reference/files/mobile/scripts/sync-api.ts"
            },
            {
              "text": "mobile/src/alert-dialog-context.tsx",
              "link": "/reference/files/mobile/src/alert-dialog-context.tsx"
            },
            {
              "text": "mobile/src/animations/hooks.ts",
              "link": "/reference/files/mobile/src/animations/hooks.ts"
            },
            {
              "text": "mobile/src/animations/motion-presets.ts",
              "link": "/reference/files/mobile/src/animations/motion-presets.ts"
            },
            {
              "text": "mobile/src/animations/presets.ts",
              "link": "/reference/files/mobile/src/animations/presets.ts"
            },
            {
              "text": "mobile/src/api.ts",
              "link": "/reference/files/mobile/src/api.ts"
            },
            {
              "text": "mobile/src/components/AnimatedSplashScreen.tsx",
              "link": "/reference/files/mobile/src/components/AnimatedSplashScreen.tsx"
            },
            {
              "text": "mobile/src/components/atoms/Avatar.tsx",
              "link": "/reference/files/mobile/src/components/atoms/Avatar.tsx"
            },
            {
              "text": "mobile/src/components/atoms/Badge.tsx",
              "link": "/reference/files/mobile/src/components/atoms/Badge.tsx"
            },
            {
              "text": "mobile/src/components/atoms/BottomSheet.tsx",
              "link": "/reference/files/mobile/src/components/atoms/BottomSheet.tsx"
            },
            {
              "text": "mobile/src/components/atoms/Button.tsx",
              "link": "/reference/files/mobile/src/components/atoms/Button.tsx"
            },
            {
              "text": "mobile/src/components/atoms/Checkbox.tsx",
              "link": "/reference/files/mobile/src/components/atoms/Checkbox.tsx"
            },
            {
              "text": "mobile/src/components/atoms/EmplusLottie.tsx",
              "link": "/reference/files/mobile/src/components/atoms/EmplusLottie.tsx"
            },
            {
              "text": "mobile/src/components/atoms/index.ts",
              "link": "/reference/files/mobile/src/components/atoms/index.ts"
            },
            {
              "text": "mobile/src/components/atoms/Input.tsx",
              "link": "/reference/files/mobile/src/components/atoms/Input.tsx"
            },
            {
              "text": "mobile/src/components/atoms/InputErrorLeadingIcon.tsx",
              "link": "/reference/files/mobile/src/components/atoms/InputErrorLeadingIcon.tsx"
            },
            {
              "text": "mobile/src/components/atoms/Skeleton.tsx",
              "link": "/reference/files/mobile/src/components/atoms/Skeleton.tsx"
            },
            {
              "text": "mobile/src/components/atoms/Switch.tsx",
              "link": "/reference/files/mobile/src/components/atoms/Switch.tsx"
            },
            {
              "text": "mobile/src/components/atoms/Text.tsx",
              "link": "/reference/files/mobile/src/components/atoms/Text.tsx"
            },
            {
              "text": "mobile/src/components/atoms/Toast.tsx",
              "link": "/reference/files/mobile/src/components/atoms/Toast.tsx"
            },
            {
              "text": "mobile/src/components/glass/GlassCard.tsx",
              "link": "/reference/files/mobile/src/components/glass/GlassCard.tsx"
            },
            {
              "text": "mobile/src/components/glass/index.ts",
              "link": "/reference/files/mobile/src/components/glass/index.ts"
            },
            {
              "text": "mobile/src/components/glass/LiquidGlassView.tsx",
              "link": "/reference/files/mobile/src/components/glass/LiquidGlassView.tsx"
            },
            {
              "text": "mobile/src/components/molecules/Card.tsx",
              "link": "/reference/files/mobile/src/components/molecules/Card.tsx"
            },
            {
              "text": "mobile/src/components/molecules/index.ts",
              "link": "/reference/files/mobile/src/components/molecules/index.ts"
            },
            {
              "text": "mobile/src/components/molecules/LottieHero.tsx",
              "link": "/reference/files/mobile/src/components/molecules/LottieHero.tsx"
            },
            {
              "text": "mobile/src/components/molecules/pickers/calendar-day-cell.tsx",
              "link": "/reference/files/mobile/src/components/molecules/pickers/calendar-day-cell.tsx"
            },
            {
              "text": "mobile/src/components/molecules/pickers/calendar-utils.ts",
              "link": "/reference/files/mobile/src/components/molecules/pickers/calendar-utils.ts"
            },
            {
              "text": "mobile/src/components/molecules/pickers/date-picker-sheet.tsx",
              "link": "/reference/files/mobile/src/components/molecules/pickers/date-picker-sheet.tsx"
            },
            {
              "text": "mobile/src/components/molecules/pickers/index.ts",
              "link": "/reference/files/mobile/src/components/molecules/pickers/index.ts"
            },
            {
              "text": "mobile/src/components/molecules/pickers/picker-modal-overlay.tsx",
              "link": "/reference/files/mobile/src/components/molecules/pickers/picker-modal-overlay.tsx"
            },
            {
              "text": "mobile/src/components/molecules/pickers/snapping-wheel-column.tsx",
              "link": "/reference/files/mobile/src/components/molecules/pickers/snapping-wheel-column.tsx"
            },
            {
              "text": "mobile/src/components/molecules/pickers/time-picker-sheet.tsx",
              "link": "/reference/files/mobile/src/components/molecules/pickers/time-picker-sheet.tsx"
            },
            {
              "text": "mobile/src/components/molecules/TabBarGridAnimatedBackground.tsx",
              "link": "/reference/files/mobile/src/components/molecules/TabBarGridAnimatedBackground.tsx"
            },
            {
              "text": "mobile/src/components/NotificationBootstrap.tsx",
              "link": "/reference/files/mobile/src/components/NotificationBootstrap.tsx"
            },
            {
              "text": "mobile/src/components/organisms/AnimatedFlatList.tsx",
              "link": "/reference/files/mobile/src/components/organisms/AnimatedFlatList.tsx"
            },
            {
              "text": "mobile/src/components/organisms/AppScreen.tsx",
              "link": "/reference/files/mobile/src/components/organisms/AppScreen.tsx"
            },
            {
              "text": "mobile/src/components/organisms/index.ts",
              "link": "/reference/files/mobile/src/components/organisms/index.ts"
            },
            {
              "text": "mobile/src/components/organisms/LoadingOverlay.tsx",
              "link": "/reference/files/mobile/src/components/organisms/LoadingOverlay.tsx"
            },
            {
              "text": "mobile/src/components/templates/index.ts",
              "link": "/reference/files/mobile/src/components/templates/index.ts"
            },
            {
              "text": "mobile/src/core/api/api-error.ts",
              "link": "/reference/files/mobile/src/core/api/api-error.ts"
            },
            {
              "text": "mobile/src/core/api/api-log.ts",
              "link": "/reference/files/mobile/src/core/api/api-log.ts"
            },
            {
              "text": "mobile/src/core/api/api-types.ts",
              "link": "/reference/files/mobile/src/core/api/api-types.ts"
            },
            {
              "text": "mobile/src/core/api/index.ts",
              "link": "/reference/files/mobile/src/core/api/index.ts"
            },
            {
              "text": "mobile/src/core/api/to-display-error.ts",
              "link": "/reference/files/mobile/src/core/api/to-display-error.ts"
            },
            {
              "text": "mobile/src/core/api/to-message-response.ts",
              "link": "/reference/files/mobile/src/core/api/to-message-response.ts"
            },
            {
              "text": "mobile/src/core/api/token-manager.ts",
              "link": "/reference/files/mobile/src/core/api/token-manager.ts"
            },
            {
              "text": "mobile/src/core/common/core.ts",
              "link": "/reference/files/mobile/src/core/common/core.ts"
            },
            {
              "text": "mobile/src/core/common/is-record.ts",
              "link": "/reference/files/mobile/src/core/common/is-record.ts"
            },
            {
              "text": "mobile/src/core/common/messages.ts",
              "link": "/reference/files/mobile/src/core/common/messages.ts"
            },
            {
              "text": "mobile/src/core/common/storage.ts",
              "link": "/reference/files/mobile/src/core/common/storage.ts"
            },
            {
              "text": "mobile/src/core/config/app-config.ts",
              "link": "/reference/files/mobile/src/core/config/app-config.ts"
            },
            {
              "text": "mobile/src/core/config/env.ts",
              "link": "/reference/files/mobile/src/core/config/env.ts"
            },
            {
              "text": "mobile/src/core/config/live-ws-url.ts",
              "link": "/reference/files/mobile/src/core/config/live-ws-url.ts"
            },
            {
              "text": "mobile/src/core/factory.tsx",
              "link": "/reference/files/mobile/src/core/factory.tsx"
            },
            {
              "text": "mobile/src/core/variants.ts",
              "link": "/reference/files/mobile/src/core/variants.ts"
            },
            {
              "text": "mobile/src/data/repositories/auth.repository.impl.ts",
              "link": "/reference/files/mobile/src/data/repositories/auth.repository.impl.ts"
            },
            {
              "text": "mobile/src/data/repositories/modules.repository.impl.ts",
              "link": "/reference/files/mobile/src/data/repositories/modules.repository.impl.ts"
            },
            {
              "text": "mobile/src/data/repositories/notifications.repository.impl.ts",
              "link": "/reference/files/mobile/src/data/repositories/notifications.repository.impl.ts"
            },
            {
              "text": "mobile/src/domain/repositories/auth.repository.ts",
              "link": "/reference/files/mobile/src/domain/repositories/auth.repository.ts"
            },
            {
              "text": "mobile/src/domain/repositories/modules.repository.ts",
              "link": "/reference/files/mobile/src/domain/repositories/modules.repository.ts"
            },
            {
              "text": "mobile/src/domain/repositories/notifications.repository.ts",
              "link": "/reference/files/mobile/src/domain/repositories/notifications.repository.ts"
            },
            {
              "text": "mobile/src/domain/usecases/auth/index.ts",
              "link": "/reference/files/mobile/src/domain/usecases/auth/index.ts"
            },
            {
              "text": "mobile/src/domain/usecases/base.ts",
              "link": "/reference/files/mobile/src/domain/usecases/base.ts"
            },
            {
              "text": "mobile/src/domain/usecases/modules/index.ts",
              "link": "/reference/files/mobile/src/domain/usecases/modules/index.ts"
            },
            {
              "text": "mobile/src/features/auth/auth-hero-assets.ts",
              "link": "/reference/files/mobile/src/features/auth/auth-hero-assets.ts"
            },
            {
              "text": "mobile/src/features/auth/authScreenLayout.ts",
              "link": "/reference/files/mobile/src/features/auth/authScreenLayout.ts"
            },
            {
              "text": "mobile/src/features/auth/components/AuthGridScreenShell.tsx",
              "link": "/reference/files/mobile/src/features/auth/components/AuthGridScreenShell.tsx"
            },
            {
              "text": "mobile/src/features/auth/components/ForgotPasswordAuthForm.tsx",
              "link": "/reference/files/mobile/src/features/auth/components/ForgotPasswordAuthForm.tsx"
            },
            {
              "text": "mobile/src/features/auth/components/ForgotPasswordHeroSection.tsx",
              "link": "/reference/files/mobile/src/features/auth/components/ForgotPasswordHeroSection.tsx"
            },
            {
              "text": "mobile/src/features/auth/components/ForgotPasswordLoginFooter.tsx",
              "link": "/reference/files/mobile/src/features/auth/components/ForgotPasswordLoginFooter.tsx"
            },
            {
              "text": "mobile/src/features/auth/components/LoginAuthForm.tsx",
              "link": "/reference/files/mobile/src/features/auth/components/LoginAuthForm.tsx"
            },
            {
              "text": "mobile/src/features/auth/components/LoginBrandGradientTitle.tsx",
              "link": "/reference/files/mobile/src/features/auth/components/LoginBrandGradientTitle.tsx"
            },
            {
              "text": "mobile/src/features/auth/components/LoginBuilderBackdrop.tsx",
              "link": "/reference/files/mobile/src/features/auth/components/LoginBuilderBackdrop.tsx"
            },
            {
              "text": "mobile/src/features/auth/components/LoginDreamAtmosphere.tsx",
              "link": "/reference/files/mobile/src/features/auth/components/LoginDreamAtmosphere.tsx"
            },
            {
              "text": "mobile/src/features/auth/components/LoginDreamHero.tsx",
              "link": "/reference/files/mobile/src/features/auth/components/LoginDreamHero.tsx"
            },
            {
              "text": "mobile/src/features/auth/components/LoginFooterSlot.tsx",
              "link": "/reference/files/mobile/src/features/auth/components/LoginFooterSlot.tsx"
            },
            {
              "text": "mobile/src/features/auth/components/LoginGridAnimatedBackground.tsx",
              "link": "/reference/files/mobile/src/features/auth/components/LoginGridAnimatedBackground.tsx"
            },
            {
              "text": "mobile/src/features/auth/components/LoginHeroBackground.tsx",
              "link": "/reference/files/mobile/src/features/auth/components/LoginHeroBackground.tsx"
            },
            {
              "text": "mobile/src/features/auth/components/LoginHeroSection.tsx",
              "link": "/reference/files/mobile/src/features/auth/components/LoginHeroSection.tsx"
            },
            {
              "text": "mobile/src/features/auth/components/LoginMeshBackground.tsx",
              "link": "/reference/files/mobile/src/features/auth/components/LoginMeshBackground.tsx"
            },
            {
              "text": "mobile/src/features/auth/components/LoginScreenLoading.tsx",
              "link": "/reference/files/mobile/src/features/auth/components/LoginScreenLoading.tsx"
            },
            {
              "text": "mobile/src/features/auth/components/LoginSignUpFooter.tsx",
              "link": "/reference/files/mobile/src/features/auth/components/LoginSignUpFooter.tsx"
            },
            {
              "text": "mobile/src/features/auth/components/LoginTopDecor.tsx",
              "link": "/reference/files/mobile/src/features/auth/components/LoginTopDecor.tsx"
            },
            {
              "text": "mobile/src/features/auth/components/RegisterAuthForm.tsx",
              "link": "/reference/files/mobile/src/features/auth/components/RegisterAuthForm.tsx"
            },
            {
              "text": "mobile/src/features/auth/components/RegisterHeroSection.tsx",
              "link": "/reference/files/mobile/src/features/auth/components/RegisterHeroSection.tsx"
            },
            {
              "text": "mobile/src/features/auth/components/RegisterLoginFooter.tsx",
              "link": "/reference/files/mobile/src/features/auth/components/RegisterLoginFooter.tsx"
            },
            {
              "text": "mobile/src/features/auth/components/RegisterTopBar.tsx",
              "link": "/reference/files/mobile/src/features/auth/components/RegisterTopBar.tsx"
            },
            {
              "text": "mobile/src/features/auth/components/VerifyOtpForm.tsx",
              "link": "/reference/files/mobile/src/features/auth/components/VerifyOtpForm.tsx"
            },
            {
              "text": "mobile/src/features/auth/components/VerifyOtpHeroSection.tsx",
              "link": "/reference/files/mobile/src/features/auth/components/VerifyOtpHeroSection.tsx"
            },
            {
              "text": "mobile/src/features/auth/forgotPassword.styles.ts",
              "link": "/reference/files/mobile/src/features/auth/forgotPassword.styles.ts"
            },
            {
              "text": "mobile/src/features/auth/hooks/useAuthGridChrome.ts",
              "link": "/reference/files/mobile/src/features/auth/hooks/useAuthGridChrome.ts"
            },
            {
              "text": "mobile/src/features/auth/loginScreen.styles.ts",
              "link": "/reference/files/mobile/src/features/auth/loginScreen.styles.ts"
            },
            {
              "text": "mobile/src/features/auth/registerScreen.styles.ts",
              "link": "/reference/files/mobile/src/features/auth/registerScreen.styles.ts"
            },
            {
              "text": "mobile/src/features/auth/verifyOtpScreen.styles.ts",
              "link": "/reference/files/mobile/src/features/auth/verifyOtpScreen.styles.ts"
            },
            {
              "text": "mobile/src/features/budget/components/budget-filter.tsx",
              "link": "/reference/files/mobile/src/features/budget/components/budget-filter.tsx"
            },
            {
              "text": "mobile/src/features/budget/components/BudgetActionMenu.tsx",
              "link": "/reference/files/mobile/src/features/budget/components/BudgetActionMenu.tsx"
            },
            {
              "text": "mobile/src/features/budget/components/BudgetHeader.tsx",
              "link": "/reference/files/mobile/src/features/budget/components/BudgetHeader.tsx"
            },
            {
              "text": "mobile/src/features/budget/components/budgetQueries.ts",
              "link": "/reference/files/mobile/src/features/budget/components/budgetQueries.ts"
            },
            {
              "text": "mobile/src/features/budget/components/BudgetSummaryCard.tsx",
              "link": "/reference/files/mobile/src/features/budget/components/BudgetSummaryCard.tsx"
            },
            {
              "text": "mobile/src/features/budget/components/constants.ts",
              "link": "/reference/files/mobile/src/features/budget/components/constants.ts"
            },
            {
              "text": "mobile/src/features/budget/components/ExpenseItem.tsx",
              "link": "/reference/files/mobile/src/features/budget/components/ExpenseItem.tsx"
            },
            {
              "text": "mobile/src/features/budget/components/LiquidProgressBar.tsx",
              "link": "/reference/files/mobile/src/features/budget/components/LiquidProgressBar.tsx"
            },
            {
              "text": "mobile/src/features/budget/hooks/useBudgetData.ts",
              "link": "/reference/files/mobile/src/features/budget/hooks/useBudgetData.ts"
            },
            {
              "text": "mobile/src/features/budget/index.ts",
              "link": "/reference/files/mobile/src/features/budget/index.ts"
            },
            {
              "text": "mobile/src/features/home/components/FocusCard.tsx",
              "link": "/reference/files/mobile/src/features/home/components/FocusCard.tsx"
            },
            {
              "text": "mobile/src/features/home/components/HeroCard.tsx",
              "link": "/reference/files/mobile/src/features/home/components/HeroCard.tsx"
            },
            {
              "text": "mobile/src/features/home/components/HomeChromeNotificationButton.tsx",
              "link": "/reference/files/mobile/src/features/home/components/HomeChromeNotificationButton.tsx"
            },
            {
              "text": "mobile/src/features/home/components/HomeClock.tsx",
              "link": "/reference/files/mobile/src/features/home/components/HomeClock.tsx"
            },
            {
              "text": "mobile/src/features/home/components/HomeDecorations.tsx",
              "link": "/reference/files/mobile/src/features/home/components/HomeDecorations.tsx"
            },
            {
              "text": "mobile/src/features/home/components/HomeHeader.tsx",
              "link": "/reference/files/mobile/src/features/home/components/HomeHeader.tsx"
            },
            {
              "text": "mobile/src/features/home/components/homeMap.ts",
              "link": "/reference/files/mobile/src/features/home/components/homeMap.ts"
            },
            {
              "text": "mobile/src/features/home/components/homeQueries.ts",
              "link": "/reference/files/mobile/src/features/home/components/homeQueries.ts"
            },
            {
              "text": "mobile/src/features/home/components/QuickActions.tsx",
              "link": "/reference/files/mobile/src/features/home/components/QuickActions.tsx"
            },
            {
              "text": "mobile/src/features/home/components/UpcomingEvents.tsx",
              "link": "/reference/files/mobile/src/features/home/components/UpcomingEvents.tsx"
            },
            {
              "text": "mobile/src/features/home/homeScreen.styles.ts",
              "link": "/reference/files/mobile/src/features/home/homeScreen.styles.ts"
            },
            {
              "text": "mobile/src/features/home/hooks/useHomeData.ts",
              "link": "/reference/files/mobile/src/features/home/hooks/useHomeData.ts"
            },
            {
              "text": "mobile/src/features/home/index.ts",
              "link": "/reference/files/mobile/src/features/home/index.ts"
            },
            {
              "text": "mobile/src/features/live/index.ts",
              "link": "/reference/files/mobile/src/features/live/index.ts"
            },
            {
              "text": "mobile/src/features/live/live-channel-context.tsx",
              "link": "/reference/files/mobile/src/features/live/live-channel-context.tsx"
            },
            {
              "text": "mobile/src/features/mood/components/MoodVibeCheck.tsx",
              "link": "/reference/files/mobile/src/features/mood/components/MoodVibeCheck.tsx"
            },
            {
              "text": "mobile/src/features/mood/index.ts",
              "link": "/reference/files/mobile/src/features/mood/index.ts"
            },
            {
              "text": "mobile/src/features/mood/mood-band.ts",
              "link": "/reference/files/mobile/src/features/mood/mood-band.ts"
            },
            {
              "text": "mobile/src/features/notifications/push-notifications-preference.ts",
              "link": "/reference/files/mobile/src/features/notifications/push-notifications-preference.ts"
            },
            {
              "text": "mobile/src/features/pairing/PairingGradientTitle.tsx",
              "link": "/reference/files/mobile/src/features/pairing/PairingGradientTitle.tsx"
            },
            {
              "text": "mobile/src/features/pairing/PairingGridShell.tsx",
              "link": "/reference/files/mobile/src/features/pairing/PairingGridShell.tsx"
            },
            {
              "text": "mobile/src/features/pairing/pairingScreen.styles.ts",
              "link": "/reference/files/mobile/src/features/pairing/pairingScreen.styles.ts"
            },
            {
              "text": "mobile/src/features/pairing/PairingScreenBody.tsx",
              "link": "/reference/files/mobile/src/features/pairing/PairingScreenBody.tsx"
            },
            {
              "text": "mobile/src/features/pairing/QRScannerSheet.tsx",
              "link": "/reference/files/mobile/src/features/pairing/QRScannerSheet.tsx"
            },
            {
              "text": "mobile/src/features/profile/components/BirthDatePickerSheet.tsx",
              "link": "/reference/files/mobile/src/features/profile/components/BirthDatePickerSheet.tsx"
            },
            {
              "text": "mobile/src/features/profile/components/BirthTimePickerSheet.tsx",
              "link": "/reference/files/mobile/src/features/profile/components/BirthTimePickerSheet.tsx"
            },
            {
              "text": "mobile/src/features/timeline/components/MemoryDetailBentoGrid.tsx",
              "link": "/reference/files/mobile/src/features/timeline/components/MemoryDetailBentoGrid.tsx"
            },
            {
              "text": "mobile/src/features/timeline/components/TimelineAuthGate.tsx",
              "link": "/reference/files/mobile/src/features/timeline/components/TimelineAuthGate.tsx"
            },
            {
              "text": "mobile/src/features/timeline/components/TimelineDateGroup.tsx",
              "link": "/reference/files/mobile/src/features/timeline/components/TimelineDateGroup.tsx"
            },
            {
              "text": "mobile/src/features/timeline/components/TimelineDateGroupHeader.tsx",
              "link": "/reference/files/mobile/src/features/timeline/components/TimelineDateGroupHeader.tsx"
            },
            {
              "text": "mobile/src/features/timeline/components/TimelineHeader.tsx",
              "link": "/reference/files/mobile/src/features/timeline/components/TimelineHeader.tsx"
            },
            {
              "text": "mobile/src/features/timeline/components/TimelineImageViewer.tsx",
              "link": "/reference/files/mobile/src/features/timeline/components/TimelineImageViewer.tsx"
            },
            {
              "text": "mobile/src/features/timeline/components/TimelineImageViewerLazy.tsx",
              "link": "/reference/files/mobile/src/features/timeline/components/TimelineImageViewerLazy.tsx"
            },
            {
              "text": "mobile/src/features/timeline/components/TimelineItem.tsx",
              "link": "/reference/files/mobile/src/features/timeline/components/TimelineItem.tsx"
            },
            {
              "text": "mobile/src/features/timeline/components/timelineMap.ts",
              "link": "/reference/files/mobile/src/features/timeline/components/timelineMap.ts"
            },
            {
              "text": "mobile/src/features/timeline/components/TimelineMemoryRow.tsx",
              "link": "/reference/files/mobile/src/features/timeline/components/TimelineMemoryRow.tsx"
            },
            {
              "text": "mobile/src/features/timeline/components/TimelineMemorySectionList.tsx",
              "link": "/reference/files/mobile/src/features/timeline/components/TimelineMemorySectionList.tsx"
            },
            {
              "text": "mobile/src/features/timeline/components/timelineQueries.ts",
              "link": "/reference/files/mobile/src/features/timeline/components/timelineQueries.ts"
            },
            {
              "text": "mobile/src/features/timeline/hooks/useTimelineData.ts",
              "link": "/reference/files/mobile/src/features/timeline/hooks/useTimelineData.ts"
            },
            {
              "text": "mobile/src/features/timeline/hooks/useTimelineDeleteMemory.ts",
              "link": "/reference/files/mobile/src/features/timeline/hooks/useTimelineDeleteMemory.ts"
            },
            {
              "text": "mobile/src/features/timeline/index.ts",
              "link": "/reference/files/mobile/src/features/timeline/index.ts"
            },
            {
              "text": "mobile/src/features/timeline/screens/TimelineAuthenticatedBody.tsx",
              "link": "/reference/files/mobile/src/features/timeline/screens/TimelineAuthenticatedBody.tsx"
            },
            {
              "text": "mobile/src/forms.ts",
              "link": "/reference/files/mobile/src/forms.ts"
            },
            {
              "text": "mobile/src/framework/ctx/api-context.tsx",
              "link": "/reference/files/mobile/src/framework/ctx/api-context.tsx"
            },
            {
              "text": "mobile/src/framework/ctx/session-context.tsx",
              "link": "/reference/files/mobile/src/framework/ctx/session-context.tsx"
            },
            {
              "text": "mobile/src/framework/di/dependencies.ts",
              "link": "/reference/files/mobile/src/framework/di/dependencies.ts"
            },
            {
              "text": "mobile/src/hooks/a11y.ts",
              "link": "/reference/files/mobile/src/hooks/a11y.ts"
            },
            {
              "text": "mobile/src/hooks/use-reduced-motion.ts",
              "link": "/reference/files/mobile/src/hooks/use-reduced-motion.ts"
            },
            {
              "text": "mobile/src/lib/sync-expo-push-token.ts",
              "link": "/reference/files/mobile/src/lib/sync-expo-push-token.ts"
            },
            {
              "text": "mobile/src/lottie/inventory.ts",
              "link": "/reference/files/mobile/src/lottie/inventory.ts"
            },
            {
              "text": "mobile/src/presentation/hooks/auth/index.ts",
              "link": "/reference/files/mobile/src/presentation/hooks/auth/index.ts"
            },
            {
              "text": "mobile/src/presentation/hooks/auth/useAuth.ts",
              "link": "/reference/files/mobile/src/presentation/hooks/auth/useAuth.ts"
            },
            {
              "text": "mobile/src/presentation/hooks/auth/useForgotPasswordRequest.ts",
              "link": "/reference/files/mobile/src/presentation/hooks/auth/useForgotPasswordRequest.ts"
            },
            {
              "text": "mobile/src/presentation/hooks/auth/useLogin.ts",
              "link": "/reference/files/mobile/src/presentation/hooks/auth/useLogin.ts"
            },
            {
              "text": "mobile/src/presentation/hooks/auth/useLogout.ts",
              "link": "/reference/files/mobile/src/presentation/hooks/auth/useLogout.ts"
            },
            {
              "text": "mobile/src/presentation/hooks/auth/useRegister.ts",
              "link": "/reference/files/mobile/src/presentation/hooks/auth/useRegister.ts"
            },
            {
              "text": "mobile/src/presentation/hooks/notifications/useNotifications.ts",
              "link": "/reference/files/mobile/src/presentation/hooks/notifications/useNotifications.ts"
            },
            {
              "text": "mobile/src/session-context.tsx",
              "link": "/reference/files/mobile/src/session-context.tsx"
            },
            {
              "text": "mobile/src/theme/aura-colors.ts",
              "link": "/reference/files/mobile/src/theme/aura-colors.ts"
            },
            {
              "text": "mobile/src/theme/elevation.ts",
              "link": "/reference/files/mobile/src/theme/elevation.ts"
            },
            {
              "text": "mobile/src/theme/emplus-design-tokens.ts",
              "link": "/reference/files/mobile/src/theme/emplus-design-tokens.ts"
            },
            {
              "text": "mobile/src/theme/engine.tsx",
              "link": "/reference/files/mobile/src/theme/engine.tsx"
            },
            {
              "text": "mobile/src/theme/gradients.ts",
              "link": "/reference/files/mobile/src/theme/gradients.ts"
            },
            {
              "text": "mobile/src/theme/index.ts",
              "link": "/reference/files/mobile/src/theme/index.ts"
            },
            {
              "text": "mobile/src/theme/theme-builder.ts",
              "link": "/reference/files/mobile/src/theme/theme-builder.ts"
            },
            {
              "text": "mobile/src/theme/theme-mode-context.tsx",
              "link": "/reference/files/mobile/src/theme/theme-mode-context.tsx"
            },
            {
              "text": "mobile/src/theme/themes.ts",
              "link": "/reference/files/mobile/src/theme/themes.ts"
            },
            {
              "text": "mobile/src/theme/tokens/index.ts",
              "link": "/reference/files/mobile/src/theme/tokens/index.ts"
            },
            {
              "text": "mobile/src/theme/tokens/palette.ts",
              "link": "/reference/files/mobile/src/theme/tokens/palette.ts"
            },
            {
              "text": "mobile/src/theme/tokens/semantic.ts",
              "link": "/reference/files/mobile/src/theme/tokens/semantic.ts"
            },
            {
              "text": "mobile/src/theme/typography-roles.ts",
              "link": "/reference/files/mobile/src/theme/typography-roles.ts"
            },
            {
              "text": "mobile/src/toast-context.tsx",
              "link": "/reference/files/mobile/src/toast-context.tsx"
            },
            {
              "text": "mobile/src/types/declarations.d.ts",
              "link": "/reference/files/mobile/src/types/declarations.d.ts"
            },
            {
              "text": "mobile/src/types/react-native-vector-icons.d.ts",
              "link": "/reference/files/mobile/src/types/react-native-vector-icons.d.ts"
            },
            {
              "text": "mobile/src/ui-kit.tsx",
              "link": "/reference/files/mobile/src/ui-kit.tsx"
            },
            {
              "text": "mobile/src/utils/cn.ts",
              "link": "/reference/files/mobile/src/utils/cn.ts"
            },
            {
              "text": "mobile/src/utils/date-format-vn.ts",
              "link": "/reference/files/mobile/src/utils/date-format-vn.ts"
            },
            {
              "text": "mobile/src/utils/expo-helpers.ts",
              "link": "/reference/files/mobile/src/utils/expo-helpers.ts"
            },
            {
              "text": "mobile/src/utils/glass.ts",
              "link": "/reference/files/mobile/src/utils/glass.ts"
            },
            {
              "text": "mobile/src/utils/home-helpers.ts",
              "link": "/reference/files/mobile/src/utils/home-helpers.ts"
            },
            {
              "text": "mobile/src/utils/lunar-label.ts",
              "link": "/reference/files/mobile/src/utils/lunar-label.ts"
            },
            {
              "text": "mobile/src/utils/session-api-feedback.ts",
              "link": "/reference/files/mobile/src/utils/session-api-feedback.ts"
            },
            {
              "text": "mobile/src/utils/timeline-helpers.ts",
              "link": "/reference/files/mobile/src/utils/timeline-helpers.ts"
            },
            {
              "text": "mobile/src/utils/tws.ts",
              "link": "/reference/files/mobile/src/utils/tws.ts"
            },
            {
              "text": "mobile/tsconfig.components.json",
              "link": "/reference/files/mobile/tsconfig.components.json"
            },
            {
              "text": "mobile/tsconfig.json",
              "link": "/reference/files/mobile/tsconfig.json"
            }
          ]
        },
        {
          "text": "web",
          "collapsed": false,
          "items": [
            {
              "text": "web/astro.config.mjs",
              "link": "/reference/files/web/astro.config.mjs"
            },
            {
              "text": "web/package.json",
              "link": "/reference/files/web/package.json"
            },
            {
              "text": "web/src/content.config.ts",
              "link": "/reference/files/web/src/content.config.ts"
            },
            {
              "text": "web/src/env.d.ts",
              "link": "/reference/files/web/src/env.d.ts"
            },
            {
              "text": "web/src/lib/site.ts",
              "link": "/reference/files/web/src/lib/site.ts"
            },
            {
              "text": "web/src/pages/rss.xml.ts",
              "link": "/reference/files/web/src/pages/rss.xml.ts"
            },
            {
              "text": "web/src/styles/global.css",
              "link": "/reference/files/web/src/styles/global.css"
            },
            {
              "text": "web/tailwind.config.mjs",
              "link": "/reference/files/web/tailwind.config.mjs"
            },
            {
              "text": "web/tsconfig.json",
              "link": "/reference/files/web/tsconfig.json"
            }
          ]
        }
      ]
    },
    "outline": {
      "level": [
        2,
        3
      ]
    },
    "docFooter": {
      "prev": false,
      "next": false
    }
  }
};
