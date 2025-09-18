<script lang="ts" setup>
import {
  NTabPane, 
  NTabs,
  NForm, 
  NFormItem, 
  NInput, 
  NModal,
  NButton, 
  NTooltip,
  NInputOtp,
  useMessage,
  type FormItemRule,
  type FormInst, 
  type FormRules, 
  type FormItemInst
} from "naive-ui"
import { computed, onMounted, ref, type Ref } from "vue"
import { useRouter } from "vue-router"

import { useAuthStore } from "@/stores/auth-store"

const _m = useMessage()
const router = useRouter()
const authStore = useAuthStore()

const passwordFormRef = ref<FormInst | null>(null)
const phoneFormRef = ref<FormInst | null>(null)
const phoneCaptchaOtpFormRef = ref<FormInst | null>(null)
const passwordCaptchaCanvas = ref<HTMLCanvasElement | null>(null)
const phoneCaptchaCanvas = ref<HTMLCanvasElement | null>(null)
const phoneFormItemRef = ref<FormItemInst | null>(null)
const captchaChars = ref("")
const passwordForm = ref(
  {
    username: "admin",
    password: "123456",
    captcha: "",
  }
)
const phoneCaptchaForm = ref({
  phone: "",
  captcha: "",
  phoneCaptcha: "",
})
const phoneCaptchaOtpForm = ref<{ phoneCaptcha: string[] }>({
  phoneCaptcha: [],
})
const passwordFormRules = ref<FormRules>({
  username: [
    { required: true, message: "请输入用户名" }
  ],
  password: [
    { required: true, message: "请输入密码" }
  ],
  captcha: [
    { required: true, message: "请输入验证码" },
    { 
      validator: (_rule: FormItemRule, value: string, callback: (error?: Error) => void): undefined => {
        if (value.toUpperCase() !== captchaChars.value.toUpperCase()) {
          callback(new Error("验证码错误"))
        } else {
          callback()
        }
      },
      trigger: ["input", "blur"]
    }
  ]
})
const phoneCaptchaFormRules = ref({
  phone: [
    { required: true, message: "请输入手机号" },
    { validator: (_rule: FormItemRule, value: string, callback: (error?: Error) => void): undefined => {
      if (!phoneIsValid(value)) {
        callback(new Error("请输入正确的手机号"))
      } else {
        callback()
      }
    }, trigger: ["input", "blur"] }
  ],
  phoneCaptcha: [
    { required: true, message: "请输入手机验证码" }
  ]
})
const phoneCaptchaOtpFormRules = ref<FormRules>({
  phoneCaptcha: [
    {
      validator: (_rule: FormItemRule, value: string[], callback: (error?: Error) => void): undefined => {
        if (value === undefined) {
          callback(new Error("请输入手机验证码"))
        } else if (value.length !== 6) {
          callback(new Error("请输入正确的手机验证码"))
        } else {
          callback()
        }
      }, trigger: ["blur"]
    }
  ]
})
const phoneCanvasCaptchaFeedback = computed(() => {
  if (phoneCaptchaForm.value.captcha.length === 0) {
    return "请输入验证码"
  }
  if (phoneCaptchaForm.value.captcha.toUpperCase() !== captchaChars.value.toUpperCase()) {
    return "验证码错误"
  }
  return undefined
})
const phoneCanvasCaptchaValidationStatus = computed(() => {
  if (phoneCaptchaForm.value.captcha.length === 0) {
    return "error"
  }
  if (phoneCaptchaForm.value.captcha.toUpperCase() !== captchaChars.value.toUpperCase()) {
    return "error"
  }
  return "success"
})
const phoneCaptchaFetchedCountdown = ref(0)
const phoneCaptchaModalShown = ref(false)

const phoneIsValid = (phone: string) => {
  return /^1[3-9]\d{9}$/.test(phone)
}

const randomColor = () => {
  const c = Math.floor(Math.random() * 0xFFFFFF)
  return `#${c.toString(16)}`
}

const generateCaptchaRdText = () => {
  const availableChars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
  let chars = ""
  for (let i = 0; i < 5; i += 1) {
    chars += availableChars[Math.floor(Math.random() * availableChars.length)]
  }
  return chars
}

const generateCaptcha = (canvasRef: Ref<HTMLCanvasElement | null>) => {
  if (!canvasRef.value) {
    setTimeout(() => {
      generateCaptcha(canvasRef)
    }, 500)
    return
  }
  const ctx = canvasRef.value?.getContext("2d")
  ctx?.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height)
  // 绘制验证码
  ctx!.font = "90px Arial"
  ctx!.fillStyle = "#000000"
  const chars = generateCaptchaRdText()
  captchaChars.value = chars
  ctx!.textAlign = "center"
  ctx!.textBaseline = "middle"
  ctx!.fillText(chars, canvasRef.value.width / 2, canvasRef.value.height / 2)
  // 绘制干扰线
  for (let i = 0; i < 15; i += 1) {
    ctx!.beginPath()
    ctx!.strokeStyle = randomColor()
    ctx!.lineWidth = Math.random() * 5 + 1
    ctx!.moveTo(Math.random() * canvasRef.value.width, Math.random() * canvasRef.value.height)
    ctx!.lineTo(Math.random() * canvasRef.value.width, Math.random() * canvasRef.value.height)
    ctx!.stroke()
  }
  // 绘制干扰点
  for (let i = 0; i < 100; i += 1) {
    ctx!.beginPath()
    ctx!.fillStyle = randomColor()
    ctx!.globalAlpha = Math.random() * 1 + 0.5
    ctx!.arc(Math.random() * canvasRef.value.width, Math.random() * canvasRef.value.height, 1, 0, 2 * Math.PI)
    ctx!.fill()
  }
}

const generatePasswordCaptcha = () => {
  generateCaptcha(passwordCaptchaCanvas)
}

const generatePhoneCaptcha = () => {
  generateCaptcha(phoneCaptchaCanvas)
}

const handleGetPhoneCaptcha = async () => {
  if (!phoneIsValid(phoneCaptchaForm.value.phone)) {
    await phoneFormItemRef.value?.validate()
    _m.error("请输入正确的手机号")
    return
  }
  if (phoneCaptchaForm.value.captcha.length === 0) {
    _m.error("请输入验证码")
    return    
  }
  if (phoneCaptchaForm.value.captcha.toUpperCase() !== captchaChars.value.toUpperCase()) {
    _m.error("验证码错误")
    return
  }
  phoneCaptchaFetchedCountdown.value = 60
  const interval = setInterval(() => {
    phoneCaptchaFetchedCountdown.value -= 1
    if (phoneCaptchaFetchedCountdown.value <= 0) {
      clearInterval(interval)
    }
  }, 1000)
  phoneCaptchaModalShown.value = true
  console.log("获取验证码")
}

const handleSwitchForm = (tab: string) => {
  switch (tab) {
    case "user-password":
      generateCaptcha(passwordCaptchaCanvas)
      break
    case "phone-capcha":
      generateCaptcha(phoneCaptchaCanvas)
      break
  }
}

const handlePasswordLogin = () => {
  passwordFormRef.value?.validate().then(async () => {
    // TODO: api verify username and password
    authStore.setToken("123456")
    authStore.setUser({
      id: "1",
      username: "kanto luna",
      role: "admin"
    })
    await router.push("/")  
  }).catch((error: Error) => {
    // _m.error(error.message)
    console.error(error)
  })
}

const handlePhoneLogin = () => {
  phoneFormRef.value?.validate().then(async () => {
    await phoneCaptchaOtpFormRef.value?.validate().then(async () => {
      // TODO: api verify phone and phoneCaptcha
      authStore.setToken("123456")
      authStore.setUser({
        id: "1",
        username: "kanto luna",
        role: "admin"
      })
      await router.push("/")
    }).catch((error: Error) => {
      // _m.error(error.message)
      console.error(error)
    })
  }).catch((error: Error) => {
    // _m.error(error.message)
    console.error(error)
  })
}

onMounted(() => {
  generateCaptcha(passwordCaptchaCanvas)
})
</script>

<template>
  <div class="h-screen flex flex-col items-center justify-center bg-gray-50">
    <div class="text-2xl font-bold mb-4">
      Vue3 后台管理系统
    </div>
    <div class="card w-[300px] md:w-[500px] pt-0!">
      <div class="flex flex-col">
        <n-tabs type="line" @update:value="handleSwitchForm" animated>
          <n-tab-pane name="user-password" tab="密码登录">
            <n-form ref="passwordFormRef" :model="passwordForm" :rules="passwordFormRules">
              <n-form-item label="用户名" path="username">
                <n-input v-model:value="passwordForm.username" @keydown.enter="handlePasswordLogin" />
              </n-form-item>
              <n-form-item label="密码" path="password">
                <n-input v-model:value="passwordForm.password" type="password" show-password-on="mousedown" @keydown.enter="handlePasswordLogin" />
              </n-form-item>
              <n-form-item label="验证码" path="captcha">
                  <n-input class="flex-grow-1" v-model:value="passwordForm.captcha" @keydown.enter="handlePasswordLogin" />
                  <n-tooltip>
                    <template #trigger>
                      <canvas 
                        ref="passwordCaptchaCanvas" 
                        class="h-[34px] w-[50%] cursor-pointer"
                        @click="generatePasswordCaptcha"
                      ></canvas>
                    </template>
                    <span>点击刷新验证码</span>
                  </n-tooltip>
              </n-form-item>
            </n-form>
            <div class="flex justify-center gap-2">
              <n-button type="primary" @click="handlePasswordLogin">登录</n-button>
            </div>
          </n-tab-pane>
          <n-tab-pane name="phone-capcha" tab="验证码登录">
            <n-form ref="phoneFormRef" :model="phoneCaptchaForm" :rules="phoneCaptchaFormRules">
              <n-form-item label="手机号" path="phone" ref="phoneFormItemRef">
                <n-input v-model:value="phoneCaptchaForm.phone" @keydown.enter="handlePhoneLogin" />
              </n-form-item>
              <n-form-item label="验证码" path="captcha" :feedback="phoneCanvasCaptchaFeedback" :validation-status="phoneCanvasCaptchaValidationStatus">
                <n-input v-model:value="phoneCaptchaForm.captcha" @keydown.enter="handlePhoneLogin" />
                <n-tooltip>
                  <template #trigger>
                    <canvas 
                      ref="phoneCaptchaCanvas" 
                      class="h-[34px] w-[50%] cursor-pointer"
                      @click="generatePhoneCaptcha"
                    ></canvas>
                  </template>
                  <span>点击刷新验证码</span>
                </n-tooltip>
              </n-form-item>
            </n-form>
            <div class="flex justify-center gap-2">
              <n-button type="primary" @click="handleGetPhoneCaptcha" :disabled="phoneCaptchaFetchedCountdown > 0">
                {{ phoneCaptchaFetchedCountdown > 0 ? `重新获取(${phoneCaptchaFetchedCountdown}s)` : "获取验证码" }}
              </n-button>
            </div>
          </n-tab-pane>
        </n-tabs>
      </div>
    </div>
    <n-modal v-model:show="phoneCaptchaModalShown" :mask-closable="false">
      <div class="card w-[300px] px-2 flex flex-col">
        <div class="text-lg">
          手机验证码
        </div>
        <div class="w-fit self-center phone-captcha-form">
          <n-form ref="phoneCaptchaOtpFormRef" :model="phoneCaptchaOtpForm" :rules="phoneCaptchaOtpFormRules">
            <n-form-item path="phoneCaptcha">
              <n-input-otp v-model:value="phoneCaptchaOtpForm.phoneCaptcha" />
            </n-form-item>
          </n-form>
        </div>
        <div class="flex justify-center">
          <n-button type="primary" @click="handlePhoneLogin">登录</n-button>
        </div>
      </div>
    </n-modal>
  </div>
</template>

<style scoped>
</style>