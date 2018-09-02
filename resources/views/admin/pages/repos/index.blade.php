@extends('admin.master')
@section('content')
    <nav aria-label="breadcrumb" class="mt-3">
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="#">Home</a></li>
            <li class="breadcrumb-item active" aria-current="page">Library</li>
        </ol>
    </nav>

    <div class="mb-md-3">
        @if (session('success'))
            <div class="alert alert-success" role="alert">
                {{ session('success') }}
            </div>
        @endif

        @if (session('error'))
            <div class="alert alert-danger" role="alert">
                {{ session('error') }}
            </div>
        @endif
        <form action="{{route('sync.repos')}}" method="POST">
            {{ csrf_field() }}
            <button class="btn btn-primary" type="submit">Sync Repositories</button>
        </form>
    </div>

    <div class="table-responsive">
        <table class="table table-bordered table-light">
            <thead>
            <tr class="table-primary">
                <th scope="col" width="5%">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Owner</th>
                <th scope="col" width="30%">Action</th>
            </tr>
            </thead>
            <tbody>
            @foreach($repos as $repo)
                <tr>
                    <th scope="row">{{ $repo->id }}</th>
                    <td>{{ $repo->name }}</td>
                    <td>{{ $repo->owner }}</td>
                    <td>
                        <button class="btn btn-info active-repo" id="active-repo-{{$repo->id}}"  data-owner="{{ $repo->owner }}" data-repository="{{ $repo->name }}">
                            <i class="fas fa-plus"></i>
                        </button>
                        <button class="btn btn-primary"><i class="fas fa-upload"></i></button>
                        <button class="btn btn-dark"><i class="fas fa-download"></i></button>
                        <button class="btn btn-warning"><i class="fas fa-eye"></i></button>
                    </td>
                </tr>
            @endforeach
            </tbody>
        </table>
    </div>

    <div>
        <nav aria-label="Page navigation example">
            <ul class="pagination">
                {!! $repos->render() !!}
            </ul>
        </nav>
    </div>

@endsection

@section('pageJs')
    <script  type="module" src="{{asset('js/repository/script.js')}}"></script>
@endsection