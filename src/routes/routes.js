//MOVIES
export async function getAllMovies() {
  const res = await fetch('http://localhost:8080/Movie/getAll');
  const data = await res.json();
  return data;
}

export async function getMovieById(id) {
  const res = await fetch(`http://localhost:8080/Movie/read/${id}`);
  const data = await res.json();
  return data;
}

export async function createMovie(movie) {
    const res = await fetch("http://localhost:8080/Movie/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(movie)
    });
    return await res.json();
}

export async function updateMovie(movie) {
    const res = await fetch("http://localhost:8080/Movie/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(movie)
    });
    return await res.json();
}

export async function deleteMovie(id) {
    await fetch(`http://localhost:8080/Movie/delete/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
    });
}

export async function getMoviesByGenre(genre){
    const res = await fetch(`http://localhost:8080/Movie/genre/${genre}`);
    const data = await res.json();
    return data;
}

export async function findByTitle(title){
    const res = await fetch(`http://localhost:8080/Movie/title/${title}`);
    const data = await res.json();
    return data;
}

//BRANCHES
export async function getBranchById(id) {
    const res = await fetch(`http://localhost:8080/branch/read/${id}`);
    const data = await res.json();
    return data;
}

export async function createBranch(branch) {
    const res = await fetch("http://localhost:8080/branch/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(branch)
    });
    return await res.json();
}

export async function deleteBranch(id) {
    await fetch(`http://localhost:8080/branch/delete/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
    });
}

export async function getAllBranches() {
    const res = await fetch('http://localhost:8080/branch/getAll');
    const data = await res.json();
    return data;
}

//THEATERS
export async function getTheaterById(id) {
    const res = await fetch(`http://localhost:8080/theaterRoom/read/${id}`);
    const data = await res.json();
    return data;
}

export async function createTheater(theater) {
    const res = await fetch("http://localhost:8080/theaterRoom/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(theater)
    });
    return await res.json();
}

export async function deleteTheater(id) {
    await fetch(`http://localhost:8080/theaterRoom/delete/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
    });
}

export async function getAllTheaters() {
    const res = await fetch("http://localhost:8080/theaterRoom/getAll");
    const data = await res.json();
    return data;
}

export async function getAllTheatersByBranchId(id) {
    const res = await fetch(`http://localhost:8080/theaterRoom/getAll/${id}`);
    const data = await res.json();
    return data;
}

//SEATS
export async function createSeat(seat) {
    const res = await fetch("http://localhost:8080/seat/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(seat)
    });
    return await res.json();
}

export async function deleteSeat(id) {
    await fetch(`http://localhost:8080/seat/delete/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
    });
}

export async function getAllSeats() {
    const res = await fetch("http://localhost:8080/seat/getAll");
    const data = await res.json();
    return data;
}

export async function updateSeatAvailability(seatId, isAvailable) {
    const res = await fetch(`http://localhost:8080/seat/updateSeats/${seatId}/${isAvailable}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
    });
    return await res.json();
}

export async function getAllSeatsByTheaterRoomIdAndAvailability(id, isAvailable) {
    const res = await fetch(`http://localhost:8080/seat/getAllByAvailability/${id}/${isAvailable}`);
    const data = await res.json();
    return data;
}

//ADMINS
export async function getAllAdmins() {
    const res = await fetch("http://localhost:8080/admin/getAll");
    const data = await res.json();
    return data;
}

export async function getAdminDetails(userId) {
    console.log("getAdminDetails called with userId:",userId);// siya
    const res = await fetch(`http://localhost:8080/admin/read/${userId}`);
    const data = await res.json();
    console.log("getAdminDetails response:", data);//sia
    return data;
}

export async function getAdminDetailsByUsername(username) {
    const res = await fetch(`http://localhost:8080/admin/readByUsername/${username}`);
    const data = await res.json();
    return data;
}

export async function createAdmin(admin) {
    const res = await fetch(`http://localhost:8080/admin/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(admin)
    });
    return await res.json();
}

export async function updateAdmin(admin) {
    console.log("updateAdmin called with:", admin);//siya
    const res = await fetch(`http://localhost:8080/admin/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(admin)
    });
    return await res.json();
}

export async function deleteAdmin(id) {
    await fetch(`http://localhost:8080/admin/delete/${id}`, {
        method: "DELETE",
        headers: {"Content-Type": "application/json"},
    });
}

//Card
export async function addCard(card) {
    const res = await fetch("http://localhost:8080/Card/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(card)
    });
    return await res.json();
}

//Payment
export async function createPayment(payment){
    const res = await fetch("http://localhost:8080/payment/create", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payment)
    });
    return await res.json();
}

//SCHEDULE
export async function createSchedule(schedule) {
    const res = await fetch("http://localhost:8080/Schedule/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(schedule)
    });
    return await res.json();
}

// CUSTOMER
export async function getAllCustomers() {
    const res = await fetch("http://localhost:8080/customer/getAll");
    const data = await res.json();
    return data;
}

export async function getCustomerDetails(userId) {
    const res = await fetch(`http://localhost:8080/customer/read/${userId}`);
    const data = await res.json();
    return data;
}

export async function getCustomerDetailsByUsername(username) {
    const res = await fetch(`http://localhost:8080/customer/readByUsername/${username}`);
    const data = await res.json();
    return data;
}

export async function createCustomer(customer) {
    const res = await fetch(`http://localhost:8080/customer/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(customer)
    });
    return await res.json();
}
export async function updateCustomer(customer) {
    const res = await fetch(`http://localhost:8080/customer/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(customer)
    });
    return await res.json();
}

export async function deleteCustomer(id) {
    const cart = await getCartByUserId(id);

    if(cart) {
       await deleteCart(cart.cartId);
    }

    await fetch(`http://localhost:8080/customer/delete/${id}`, {
        method: "DELETE",
        headers: {"Content-Type": "application/json"},
    });
}

// CART
export async function createCart(cart) {
    const res = await fetch(`http://localhost:8080/cart/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cart)
    });
    return await res.json(); // expects the created cart object with cartId
}

export async function getCartByUserId(userId) {
    const res = await fetch(`http://localhost:8080/cart/readByUserId/${userId}`);
    const data = await res.json();
    return data; // expects the cart object
}

export async function deleteCart(id) {
    await fetch(`http://localhost:8080/cart/delete/${id}`, {
        method: "DELETE",
        headers: {"Content-Type": "application/json"},
    });
}

export async function createCartItem(cartItem) {
    const res = await fetch("http://localhost:8080/cartItem/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cartItem)
    });
    return await res.json();
}

export async function getAllCartItemsByCartId(cartId) {
    const res = await fetch(`http://localhost:8080/cartItem/getAll/${cartId}`);
    const data = await res.json();
    return data;
}

export async function deleteCartItem(id) {
    await fetch(`http://localhost:8080/cartItem/delete/${id}`, {
        method: "DELETE",
        headers: {"Content-Type": "application/json"},
    });
}


