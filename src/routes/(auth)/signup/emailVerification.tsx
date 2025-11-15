import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/signup/emailVerification')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(auth)/signup/emailVerification"!</div>
}
