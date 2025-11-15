import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/signup/password')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(auth)/signup/password"!</div>
}
