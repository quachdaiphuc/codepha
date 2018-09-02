<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <title>Document</title>
    <link rel="stylesheet" href="{{asset('css/bootstrap.css')}}">
    <link rel="stylesheet" href="{{asset('css/all.min.css')}}">
    <link rel="stylesheet" href="{{asset('css/toastr.css')}}">
</head>
<body>
    <div class="container-fluid">
        @include('admin.layouts.header')
        @yield('content')
    </div>

    <script src="{{asset('js/jquery.js')}}"></script>
    <script src="{{asset('js/toastr.js')}}"></script>
    <script src="{{asset('js/bootstrap.js')}}"></script>
    <script>
        var ROOT_APP = '{!! url('/') !!}'
    </script>
    @yield('pageJs')
</body>
</html>