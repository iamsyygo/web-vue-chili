<template>
  <a-form
    class="w-60vw"
    :model="formState"
    size="large"
    :label-col="{ span: 8 }"
    :wrapper-col="{ span: 16 }"
    autocomplete="off"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
  >
    <a-form-item
      label="邮箱"
      placeholder="请输入"
      name="email"
      :rules="[{ required: true, message: '请输入邮箱' }]"
    >
      <a-input v-model:value="formState.username" />
    </a-form-item>

    <a-form-item
      label="密码"
      placeholder="请输入"
      name="password"
      :rules="[{ required: true, message: '请输入密码' }]"
    >
      <a-input-password v-model:value="formState.password" />
    </a-form-item>

    <a-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">
      <a-checkbox v-model:checked="formState.remember">记住我 🌴</a-checkbox>
    </a-form-item>

    <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
      <a-button type="primary" html-type="submit" class="w-100px">登 录</a-button>
      <a-button danger class="w-100px ml-10px" @click="handleSignInGitHub">GitHub 登录</a-button>
    </a-form-item>
  </a-form>
</template>
<script lang="ts" setup>
import { onAnthGitHubUser } from '@/api/github-sign.api';
import { onMounted, reactive } from 'vue';
import { inject } from 'vue';
import { GLOBAL_SYMBOL_BY_INJECT } from '@/utils/global.symbol';

interface FormState {
  username: string;
  password: string;
  remember: boolean;
}

const formState = reactive<FormState>({
  username: '',
  password: '',
  remember: true,
});
const onFinish = (values: any) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

const router = useRouter();
const handleSignInGitHub = () => {
  const { origin, pathname } = location;
  const query = {
    client_id: 'ab8f4d2326d62a20032d',
    redirect_uri: origin + pathname,
    scope: 'user:email',
  };
  const url = 'https://github.com/login/oauth/authorize';
  const params = new URLSearchParams(query);
  window.location.href = `${url}?${params}`;
};

const route = useRoute();

// 🥰 optimization: 将抽取为 hook
const Spin = inject(GLOBAL_SYMBOL_BY_INJECT.SPINNING);
onMounted(async () => {
  // 🐞 fix: 从浏览器URL跳转时(非编程方式，github 回调)带有 query 参数被重新定向(?xxx=0消失)
  if (route.query.code) {
    router.push(route.fullPath);
    Spin?.updateSpin();
    const data = await onAnthGitHubUser(route.query.code as string).finally(Spin?.updateSpin);
    console.log(data, '🔥');
  }
});

definePage({
  meta: {
    keepAlive: true,
    icon: 'knowledge_one',
    title: 'github 登录',
  },
  props: (route) => ({ code: route.query.code }),
});
</script>
