<template>
  <div class="signin--wrapper">
    <transition appear enter-active-class="animate__animated animate__zoomIn">
      <div class="signin--container">
        <div class="signin-form">
          <div class="signin-form--title">欢迎登录</div>
          <div class="signin-form--content">
            <a-space direction="vertical">
              <a-input v-model:value="formModel.email" size="large" placeholder="📮 请输入邮箱" />
              <a-input
                v-model:value.lazy="formModel.password"
                type="password"
                visibilityToggle
                visible
                size="large"
                placeholder="🔑 请输入密码"
              />
              <a-input-search v-model:value="formModel.code" loading>
                <template #enterButton>
                  <a-button
                    type="primary"
                    :loading="flag.loading"
                    :disabled="flag.loading"
                    @click="handleEmailCode"
                  >
                    <span v-if="flag.text === '重新发送'">{{ countdown }}</span>
                    {{ flag.text }}
                  </a-button>
                </template>
              </a-input-search>

              <a-checkbox v-model:checked="formModel.remember">记住密码</a-checkbox>
              <a-button type="primary" size="large" @click="handleSign" :loading="sign"
                >登 录</a-button
              >
            </a-space>
          </div>

          <a-space>
            <a-button type="link" size="small" @click="handleSignInGitHub"
              >使用 github 登录</a-button
            >
            <a-button type="link" size="small">注册账号</a-button>
            <a href="javascript:;">忘记密码</a>
          </a-space>
        </div>
        <div class="signin-illustration">
          <img src="./images/illustration.svg" alt="illustration" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue';
import { message } from 'ant-design-vue';
import { useLoading } from '@/hooks/loading.h';
import { onSendEmailCodeApi, onLoginApi } from '@/api/login.api';
import { onAnthGitHubUser } from '@/api/github-sign.api';
import { useAppConfigStore } from '@/store/app-config';
import { useRouter, useRoute } from 'vue-router';
import { inject } from 'vue';
import { GLOBAL_SYMBOL_BY_INJECT } from '@/utils/global.symbol';

const router = useRouter();
const { flag, setLoading } = useLoading('发送验证码');
const countdown = ref(60);

const formModel = ref({
  email: '2683030687@qq.com',
  password: '',
  code: '',
  remember: false,
});

const handleSend = async () => {
  try {
    await onSendEmailCodeApi(formModel.value.email);
    message.success('发送成功');
    setLoading('重新发送');
    const timer = setInterval(() => {
      countdown.value--;
      if (countdown.value === 0) {
        clearInterval(timer);
        setLoading('发送验证码', false);
        countdown.value = 60;
      }
    }, 1000);
  } catch (error) {
    setLoading('发送验证码', false);
  }
};

const handleEmailCode = async () => {
  if (!formModel.value.email) {
    message.error('请输入邮箱');
    return;
  }
  setLoading('发送中...', true);
  setTimeout(() => {
    handleSend();
  }, 2000);
};

const sign = ref(false);
const appConfigStore = useAppConfigStore();
const setUser = (data: any) => {
  appConfigStore.setAuthorization({
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    user: data.user,
  });
  return router.push('/main');
};
const handleSign = async () => {
  if (!formModel.value.email || !formModel.value.password || !formModel.value.code) {
    message.error('请填写完整');
    return;
  }
  sign.value = true;
  const data: any = await onLoginApi({
    email: formModel.value.email,
    password: formModel.value.password,
    code: formModel.value.code,
  }).finally(() => {
    sign.value = false;
  });

  setUser(data);
};

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
    try {
      const data = await onAnthGitHubUser(route.query.code as string);
      console.log(data, '🔥');
      await setUser(data);
      Spin?.updateSpin();
    } catch (error) {
      Spin?.updateSpin();
    }
  }
});
</script>

<style scoped lang="scss">
.signin--wrapper {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f1f2f6;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    left: -50px;
    top: -50px;
    width: 200px;
    height: 200px;
    background: url(./images/meatball.svg) no-repeat;
    animation: rotateOut 30s linear infinite;
  }
  &::after {
    content: '';
    position: absolute;
    right: -50px;
    bottom: -80px;
    width: 300px;
    height: 300px;
    background: url(./images/catcher-mit.svg) no-repeat;
    animation: rotateOut 30s linear infinite;
  }
}

.signin--container {
  display: flex;
  width: 900px;
  height: 500px;
  border-radius: 6px;
  background-color: #fff;
  box-shadow: 0 0 6px #eff1f2;
  position: relative;
  overflow: hidden;
  z-index: 99;
  &::before {
    content: '';
    position: absolute;
    right: 0;
    top: 0;
    width: 600px;
    height: 120%;
    transform: rotate(270deg);
    background: url(./images/form.bg.svg) no-repeat;
  }
}
.signin-form {
  width: 100%;
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.signin-form--title {
  font-size: 28px;
  font-weight: 900;
  margin: 50px;
  color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
  background-image: linear-gradient(to right, #7ea1fc, #396efb);
}
.signin-form--content {
  flex: 1;
  width: 100%;
  padding: 0 20px;
  text-align: center;
  margin-top: 30px;

  input.ant-input,
  span.ant-input-group-addon {
    border: none !important;
    background-color: #eff1f2;
  }
  .ant-btn {
    width: 100%;
  }
  .ant-space {
    width: 70%;
  }
  .ant-checkbox-wrapper {
    user-select: none;
    float: left;
  }
}
.signin-illustration {
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 80%;
    object-fit: cover;
  }
}

@media screen and (max-width: 800px) {
  .signin--container::before,
  .signin-illustration {
    display: none;
  }
  .signin--wrapper {
    padding: 0 20px;
  }
}
</style>
import { useLoading } from '@/hooks/loading.h';import { useLoading } from '@/hooks/loading.h';
import { useLoading } from '@/hooks/loading.h'; , himport { onSendEmailCode } from
'@/api/login.api';onSendEmailCodeApi,
