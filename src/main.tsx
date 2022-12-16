import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ComponentType, lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Layout from './Layout'

const pages = Object.entries(import.meta.glob('/src/pages/**/page.tsx')).map(
    ([pagePath, importPage]) => {
        const Page = lazy(
            () => importPage() as Promise<{ default: ComponentType }>
        )
        return {
            path: pagePath.split('/').slice(3, -1).join('/'),
            element: (
                <Suspense>
                    <Page />
                </Suspense>
            ),
        }
    }
)

const router = createBrowserRouter([
    { path: '/', element: <Layout />, children: pages },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    // <React.StrictMode>
    <RouterProvider router={router} />
    // </React.StrictMode>
)
