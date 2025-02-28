'use client'
import React from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signup } from '@/serverActions/supabaseAuth'

// Mantine のコンポーネント
import {
  Card,
  Button,
  TextInput,
  PasswordInput,
  Title,
  Stack,
  Text
} from '@mantine/core'

// サインアップ用のZodスキーマ
const signupSchema = z.object({
  email: z.string().email({ message: '無効なメールアドレスです' }),
  password: z.string().min(1, { message: 'パスワードは必須です' })
})
type SignupFormData = z.infer<typeof signupSchema>

export function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema)
  })

  const onSignupSubmit = async (data: SignupFormData) => {
    signup(data)
  }

  return (
    <Card
      withBorder
      shadow="sm"
      radius="md"
      padding="xl"
      style={{ maxWidth: 400, margin: 'auto' }}
    >
      <Title order={2} style={{ textAlign: 'center', marginBottom: '1rem' }}>
        新規登録
      </Title>

      <form onSubmit={handleSubmit(onSignupSubmit)}>
        {/* MantineのStackで要素を縦に並べ、styleで間隔を指定する */}
        <Stack style={{ gap: '1rem' }}>
          <div>
            <TextInput
              label="メールアドレス"
              placeholder="email"
              {...register('email')}
              // React Hook Form のエラーを Mantine 側のerrorプロップに渡す
              error={errors.email?.message}
              disabled={isSubmitting}
            />
          </div>
          <div>
            <PasswordInput
              label="パスワード"
              placeholder="password"
              {...register('password')}
              error={errors.password?.message}
              disabled={isSubmitting}
            />
          </div>
          <Button type="submit" loading={isSubmitting}>
            新規登録
          </Button>
        </Stack>
      </form>

      {/* エラーメッセージがあれば全体で拾う例（必要があれば使用） */}
      {errors.email?.message && (
        <Text color="red" size="sm" mt="sm">
          {errors.email.message}
        </Text>
      )}
      {errors.password?.message && (
        <Text color="red" size="sm">
          {errors.password.message}
        </Text>
      )}
    </Card>
  )
}
