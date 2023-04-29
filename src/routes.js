import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const AddProject = React.lazy(() => import('./views/addProject/AddProject'))
const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
const Typography = React.lazy(() => import('./views/theme/typography/Typography'))

const Accordion = React.lazy(() => import('./views/base/accordion/Accordion'))
const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'))
const Cards = React.lazy(() => import('./views/base/cards/Cards'))
const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'))
const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'))
const ListGroups = React.lazy(() => import('./views/base/list-groups/ListGroups'))
const Navs = React.lazy(() => import('./views/base/navs/Navs'))
const Paginations = React.lazy(() => import('./views/base/paginations/Paginations'))
const Placeholders = React.lazy(() => import('./views/base/placeholders/Placeholders'))
const Popovers = React.lazy(() => import('./views/base/popovers/Popovers'))
const Progress = React.lazy(() => import('./views/base/progress/Progress'))
const Spinners = React.lazy(() => import('./views/base/spinners/Spinners'))
const Tables = React.lazy(() => import('./views/base/tables/Tables'))
const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'))

// Buttons
const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'))
const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'))
const Dropdowns = React.lazy(() => import('./views/buttons/dropdowns/Dropdowns'))

//Forms
const ChecksRadios = React.lazy(() => import('./views/forms/checks-radios/ChecksRadios'))
const FloatingLabels = React.lazy(() => import('./views/forms/floating-labels/FloatingLabels'))
const FormControl = React.lazy(() => import('./views/forms/form-control/FormControl'))
const InputGroup = React.lazy(() => import('./views/forms/input-group/InputGroup'))
const Layout = React.lazy(() => import('./views/forms/layout/Layout'))
const Range = React.lazy(() => import('./views/forms/range/Range'))
const Select = React.lazy(() => import('./views/forms/select/Select'))
const Validation = React.lazy(() => import('./views/forms/validation/Validation'))

const Charts = React.lazy(() => import('./views/charts/Charts'))

// Icons
const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'))
const Flags = React.lazy(() => import('./views/icons/flags/Flags'))
const Brands = React.lazy(() => import('./views/icons/brands/Brands'))

// Notifications
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'))
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'))
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'))
const Toasts = React.lazy(() => import('./views/notifications/toasts/Toasts'))

const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

const page404 = React.lazy(() => import('./views/pages/page404/Page404'))

const routes = [
  { path: '/', exact: true, name: 'Home', element: Dashboard },
  { path: '/addProject', name: 'AddProject', element: AddProject, exact: true },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard, exact: true },
  { path: '/theme', name: 'Theme', element: Colors, exact: true },
  { path: '/theme/colors', name: 'Colors', element: Colors },
  { path: '/theme/typography', name: 'Typography', element: Typography, exact: true },
  { path: '/base', name: 'Base', element: Cards, exact: true },
  { path: '/base/accordion', name: 'Accordion', element: Accordion, exact: true },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', element: Breadcrumbs, exact: true },
  { path: '/base/cards', name: 'Cards', element: Cards, exact: true },
  { path: '/base/carousels', name: 'Carousel', element: Carousels, exact: true },
  { path: '/base/collapses', name: 'Collapse', element: Collapses, exact: true },
  { path: '/base/list-groups', name: 'List Groups', element: ListGroups, exact: true },
  { path: '/base/navs', name: 'Navs', element: Navs, exact: true },
  { path: '/base/paginations', name: 'Paginations', element: Paginations, exact: true },
  { path: '/base/placeholders', name: 'Placeholders', element: Placeholders, exact: true },
  { path: '/base/popovers', name: 'Popovers', element: Popovers, exact: true },
  { path: '/base/progress', name: 'Progress', element: Progress, exact: true },
  { path: '/base/spinners', name: 'Spinners', element: Spinners, exact: true },
  { path: '/base/tables', name: 'Tables', element: Tables, exact: true },
  { path: '/base/tooltips', name: 'Tooltips', element: Tooltips, exact: true },
  { path: '/buttons', name: 'Buttons', element: Buttons, exact: true },
  { path: '/buttons/buttons', name: 'Buttons', element: Buttons, exact: true },
  { path: '/buttons/dropdowns', name: 'Dropdowns', element: Dropdowns, exact: true },
  { path: '/buttons/button-groups', name: 'Button Groups', element: ButtonGroups, exact: true },
  { path: '/charts', name: 'Charts', element: Charts, exact: true },
  { path: '/forms', name: 'Forms', element: FormControl, exact: true },
  { path: '/forms/form-control', name: 'Form Control', element: FormControl, exact: true },
  { path: '/forms/select', name: 'Select', element: Select, exact: true },
  { path: '/forms/checks-radios', name: 'Checks & Radios', element: ChecksRadios, exact: true },
  { path: '/forms/range', name: 'Range', element: Range, exact: true },
  { path: '/forms/input-group', name: 'Input Group', element: InputGroup, exact: true },
  { path: '/forms/floating-labels', name: 'Floating Labels', element: FloatingLabels, exact: true },
  { path: '/forms/layout', name: 'Layout', element: Layout, exact: true },
  { path: '/forms/validation', name: 'Validation', element: Validation, exact: true },
  { path: '/icons', exact: true, name: 'Icons', element: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', element: CoreUIIcons, exact: true },
  { path: '/icons/flags', name: 'Flags', element: Flags, exact: true },
  { path: '/icons/brands', name: 'Brands', element: Brands, exact: true },
  { path: '/notifications', name: 'Notifications', element: Alerts, exact: true },
  { path: '/notifications/alerts', name: 'Alerts', element: Alerts, exact: true },
  { path: '/notifications/badges', name: 'Badges', element: Badges, exact: true },
  { path: '/notifications/modals', name: 'Modals', element: Modals, exact: true },
  { path: '/notifications/toasts', name: 'Toasts', element: Toasts, exact: true },
  { path: '/widgets', name: 'Widgets', element: Widgets, exact: true },
  { path: '*', name: 'wild', element: page404 },
]

export default routes
