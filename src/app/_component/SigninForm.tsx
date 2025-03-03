'use client'
import React from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signin } from '@/serverActions/supabaseAuth'

// Mantine のコンポーネント
import {
  Card,
  Button,
  TextInput,
  PasswordInput,
  Anchor,
  Text,
  Title,
  Stack
} from '@mantine/core'

// サインイン用のZodスキーマ
const signInSchema = z.object({
  email: z.string().email({ message: '無効なメールアドレスです' }),
  password: z.string().min(1, { message: 'パスワードは必須です' })
})
type SignInFormData = z.infer<typeof signInSchema>

export function SigninForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema)
  })

  const onSignInSubmit = async (data: SignInFormData) => {
    console.log('aaa')

    await signin(data)
  }

  return (
    <Card
      withBorder
      shadow="sm"
      radius="md"
      padding="xl"
      style={{ maxWidth: 400, margin: 'auto' }}
    >
      <Title order={2} mb="lg">
        ログイン
      </Title>

      <form onSubmit={handleSubmit(onSignInSubmit)}>
        <Stack>
          <TextInput
            label="メールアドレス"
            placeholder="email"
            {...register('email')}
            // React Hook Form のエラーを Mantine 側の error プロップに渡す
            error={errors.email?.message}
            disabled={isSubmitting}
          />

          <PasswordInput
            label="パスワード"
            placeholder="password"
            {...register('password')}
            error={errors.password?.message}
            disabled={isSubmitting}
          />

          <Button type="submit" loading={isSubmitting}>
            ログイン
          </Button>
        </Stack>
      </form>
    </Card>
  )
}
