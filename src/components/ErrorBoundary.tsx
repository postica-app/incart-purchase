import React from 'react'

export class ErrorBoundary extends React.Component<
    {
        children: React.ReactNode
        fallback: React.ReactNode
    },
    { hasError: boolean }
> {
    public state = { hasError: false }

    public static getDerivedStateFromError() {
        return { hasError: true }
    }

    public render() {
        if (this.state.hasError) {
            return this.props.fallback
        }

        return this.props.children
    }
}
