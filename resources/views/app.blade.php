<!DOCTYPE html>
<html
    lang="en"
    dir="ltr"
    class="light-style"
    data-theme="theme-default"
    data-assets-path="/assets/"
    data-template="vertical-menu-template-free"
>
<head>
    <title inertia>{{ config('app.name', 'Laravel') }}</title>
    <meta charset="utf-8"/>
    <link rel="icon" type="image/x-icon" href="{{asset('logo.svg')}}"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0"/>
    <link rel="stylesheet" href="{{asset('dashboard/assets/vendor/fonts/boxicons.css')}}"/>
    <link rel="stylesheet" href="{{asset('dashboard/assets/vendor/css/core.css')}}" class="template-customizer-core-css"/>
    <link rel="stylesheet" href="{{asset('dashboard/assets/vendor/css/theme-default.css')}}" class="template-customizer-theme-css"/>
    <link rel="stylesheet" href="{{asset('dashboard/assets/css/demo.css')}}"/>
    <link rel="stylesheet" href="{{asset('dashboard/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css')}}"/>
    <link rel="stylesheet" href="{{asset('dashboard/assets/vendor/css/pages/page-auth.css')}}"/>
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"/>
    @routes
    @viteReactRefresh
    @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
    @inertiaHead
</head>
<body>
@inertia
<script src="{{asset('dashboard/assets/vendor/js/bootstrap.js')}}"></script>
</body>
</html>
