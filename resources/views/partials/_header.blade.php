@props(['title' => 'TuneTown'])

<header class="mx-auto">
	<div class="border-b-2 navbar bg-base-100">
		{{-- LOGO --}}
		<div class="navbar-start">
			<a class="text-xl btn btn-ghost" href="{{ route('home') }}">
				{{ $title }}
			</a>
		</div>

		<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
		<script src="https://cdn.jsdelivr.net/npm/algoliasearch@4.10.5/dist/algoliasearch.umd.js"></script>
		<script src="https://cdn.jsdelivr.net/npm/@algolia/autocomplete-js@1.4.1/dist/autocomplete.min.js"></script>

		<div class="space-x-4 navbar-end">

			<div class="relative form-control">
				<div class="flex items-center justify-center space-x-1">
					<input 
						type="text" 
						id="searchInput" 
						placeholder="Search items" 
						class="w-24 input input-bordered md:w-auto"
					/>
					<div class="rounded-full btn btn-ghost aspect-square">
						<x-icons.search />
					</div>
				</div>
				<!-- Suggestion box -->
				<ul id="suggestionBox" class="absolute left-0 z-10 hidden w-full mt-1 bg-white border border-gray-300 shadow-lg top-full">
					<!-- Suggestions will be injected here -->
				</ul>
			</div>
			
			{{-- CART --}}
			{{-- if route is cart hide this --}}

			<div class="{{ Route::currentRouteName() == 'cart' ? 'hidden' : '' }} dropdown dropdown-end">
				<div tabindex="0" role="button" class="btn btn-ghost btn-circle">
					<div class="indicator">
						<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
								d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
						</svg>
						<span id="cart-badge" class="cart-qty badge badge-sm indicator-item">0</span>
					</div>
				</div>
				<div tabindex="0" class="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
					<div class="card-body">
						<span class="text-lg font-bold">
							<span class="cart-qty">0</span> Item/s
						</span>
						<span class="text-info">Subtotal: PHP <span id="cart-sbt">0</span> </span>
						<div class="card-actions">
							<a href="/cart" id="cart-view" class="btn btn-primary btn-block">View cart</a>
						</div>
					</div>
				</div>
			</div>

			{{-- User --}}
			<div class="dropdown dropdown-end">
				<div class="flex items-center w-full space-x-1">

					@auth <span class="text-xs font-bold">{{ auth()->user()->username }}</span> @endauth

					<div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
						@auth
							<div class="w-10 rounded-full">
								<img alt="Tailwind CSS Navbar component"
									src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
							</div>
						@else
							<div class="w-5 rounded-full">
								<img src="https://img.icons8.com/ios-glyphs/30/user--v1.png" alt="user--v1" />
							</div>
						@endauth
					</div>
				</div>
				<ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">

					{{-- Authenticated User --}}
					@auth
						<li>
							<a class="justify-between">
								Profile
								<span class="badge">New</span>
							</a>
						</li>
						<li>
							<form id="logout-btn" method="POST" action="{{ route('logout') }}" class="flex">
								@csrf
								<button type="submit" class="w-full text-left">Logout</button>
							</form>
						</li>
					@else
						<li><a href="/register">Register</a></li>
						<li><a href="/login">Login</a></li>
					@endauth

				</ul>
			</div>

		</div>
	</div>


	<script src="{{ asset('js/search.js') }}"></script>
	@role('customer')
	@endrole

</header>
