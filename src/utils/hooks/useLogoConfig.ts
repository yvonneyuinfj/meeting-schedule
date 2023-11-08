import type { CSSProperties } from 'vue';
import { useAppStore } from '@/store/app';
import { useRoute } from 'vue-router';
import { geSystemLogo } from '@/api/avic/system/CommonApi';
const secretLevelMap = new Map();
secretLevelMap.set('公开', '#1AA4EE');
secretLevelMap.set('普通商密', '#1e89ff');
secretLevelMap.set('核心商密', '#224ecd');
secretLevelMap.set('内部', '#fe8624');
secretLevelMap.set('秘密', '#d40000');
secretLevelMap.set('机密', '#7A0000');
export const useLogoConfig = () => {
  const route = useRoute();
  const appStore = useAppStore();
  const previewData = ref();
  onMounted(() => {
    getPreviewData();
    getSystemLogoConfig();
  });
  const logo = computed(() => {
    if (appStore.logo) {
      return appStore.logo;
    } else {
      return {};
    }
  });
  const secretLevelObj = computed(() => {
    let sercetLevel = '';
    if (previewData.value) {
      // 显示预览效果
      sercetLevel = previewData.value.secretLevel ? previewData.value.secretLevel : '公开';
    } else {
      // 显示实际效果
      sercetLevel = logo.value.secretLevel ? logo.value.secretLevel : '公开';
    }
    if (!secretLevelMap.get(sercetLevel)) {
      sercetLevel = '公开';
    }
    return {
      sercetLevel: sercetLevel,
      sercetLevelColor: secretLevelMap.get(sercetLevel)
    };
  });
  const icon = computed(() => {
    if (previewData.value) {
      // 显示预览效果
      return previewData.value.logoUrl;
    } else {
      // 显示实际效果
      return logo.value?.corLogo ? `data:image/png;base64,${logo.value.corLogo}` : logo.value?.icon;
    }
  });
  // icon/title兼容项目config配置(优先级：系统配置 > 项目配置 > 默认)
  const oneTitle = computed(() => {
    if (previewData.value) {
      return previewData.value.oneTitle;
    } else if (
      logo.value &&
      ((logo.value.oneTitle && logo.value.oneTitle != 'undefined') || logo.value.title)
    ) {
      return logo.value.oneTitle || logo.value.title;
    } else {
      return '';
    }
  });
  const secondTitle = computed(() => {
    if (previewData.value) {
      return previewData.value.secondTitle;
    } else if (logo.value?.secondTitle) {
      return logo.value.secondTitle;
    } else {
      return '';
    }
  });
  const mainTitleStyle = computed<CSSProperties>(() => {
    return previewData.value
      ? {
          fontFamily: previewData.value.oneFont,
          fontSize: `${previewData.value.oneFontSize || 20}px`,
          color: `${previewData.value.oneFontColor || '#fff'}`,
          fontWeight: previewData.value.oneFontBold === 'Y' ? 'bold' : 'normal',
          fontStyle: previewData.value.oneFontItalic === 'Y' ? 'italic' : ''
        }
      : {
          fontFamily: logo.value?.oneFont,
          fontSize: `${logo.value?.oneFontSize || 20}px`,
          color: `${logo.value?.oneFontColor || '#fff'}`,
          fontWeight: logo.value?.oneFontBold === 'Y' ? 'bold' : 'normal',
          fontStyle: logo.value?.oneFontItalic === 'Y' ? 'italic' : ''
        };
  });
  const minorTitleStyle = computed<CSSProperties>(() => {
    return previewData.value
      ? {
          fontFamily: previewData.value.secondFont,
          fontSize: `${previewData.value.secondFontSize || 20}px`,
          color: `${previewData.value.secondFontColor || '#fff'}`,
          fontWeight: previewData.value.secondFontBold === 'Y' ? 'bold' : 'normal',
          fontStyle: previewData.value.secondFontItalic === 'Y' ? 'italic' : ''
        }
      : logo.value
      ? {
          fontFamily: logo.value.secondFont,
          fontSize: `${logo.value.secondFontSize || 20}px`,
          color: `${logo.value.secondFontColor || '#fff'}`,
          fontWeight: logo.value.secondFontBold === 'Y' ? 'bold' : 'normal',
          fontStyle: logo.value.secondFontItalic === 'Y' ? 'italic' : ''
        }
      : {};
  });
  /**logo配置预览功能 */
  function getPreviewData() {
    if (route.query.logoconfig) {
      const logoconfig: any = route.query.logoconfig;
      previewData.value = JSON.parse(decodeURIComponent(logoconfig));
    }
  }
  /**加载配置的logo和系统名称 */
  function getSystemLogoConfig() {
    if (!logo.value.corLogo) {
      geSystemLogo().then(res => {
        if (res.success) {
          appStore.SET_LOGO(res.data);
        }
      });
    }
  }
  return {
    secretLevelObj,
    icon,
    oneTitle,
    secondTitle,
    mainTitleStyle,
    minorTitleStyle,
    getPreviewData
  };
};
