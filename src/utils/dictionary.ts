const DICTIONARY_CACHE_KEY = 'SYSTEM_DICTIONARY';
let dictionary = JSON.parse(localStorage.getItem(DICTIONARY_CACHE_KEY) || '{}');

/**
 * 根据字典分类获取字典数据
 * @param key
 * @returns
 */
function getDictionaryByKey(key: string) {
  return dictionary[key] || {};
}

// 转换为数组
function parseDictionary(dictionary: Record<string, any>, type?: 'number' | 'boolean') {
  return Object.entries(dictionary).map(([key, value]) => {
    if (type === 'number') {
      return { label: value, value: Number(key) };
    }
    if (type === 'boolean') {
      return { label: value, value: key === 'true' };
    }
    return { label: value, value: key };
  });
}

/**
 * 根据 code 获取字典数据
 * @param key
 * @param type
 * @returns
 */
export function fetchDictionary(key: string, type?: 'number' | 'boolean') {
  return parseDictionary(getDictionaryByKey(key), type);
}

// 设置字典数据到本地存储
export function setlocalDictionary(data: Record<string, any>) {
  dictionary = data;
  localStorage.setItem(DICTIONARY_CACHE_KEY, JSON.stringify(data));
}

// 清空字典数据
export function clearlocalDictionary() {
  dictionary = {};
  localStorage.removeItem(DICTIONARY_CACHE_KEY);
}
