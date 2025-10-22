//Auth
const token = localStorage.getItem("token");
export async function authenticateUser(username, password) {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            username: username.value,
            password: password.value,
        }),
    });

    const data = await res.json();

    if (!res.ok) {
        alert("Invalid username or password.");
        throw new Error(data.message || "Invalid username or password");
    }

    return data;
}


//MOVIES
export async function getAllMovies() {
    const token = localStorage.getItem("token");
    const res = await fetch('http://localhost:8080/Movie/getAll', {
      headers: {
          "Authorization": `Bearer ${token}`
      }
  });
  const data = await res.json();
  return data;
}

export async function getMovieById(id) {
    const token = localStorage.getItem("token");
    const res = await fetch(`http://localhost:8080/Movie/read/${id}`, {
      headers: {
          "Authorization": `Bearer ${token}`
      }
  });
  const data = await res.json();
  return data;
}

export async function createMovie(movie) {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:8080/Movie/create", {
        method: "POST",
        headers: { "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` },
        body: JSON.stringify(movie)
    });
    return await res.json();
}

export async function updateMovie(movie) {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:8080/Movie/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` },
        body: JSON.stringify(movie)
    });
    return await res.json();
}

export async function deleteMovie(id) {
    const token = localStorage.getItem("token");
    await fetch(`http://localhost:8080/Movie/delete/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` },
    });
}

export async function getMoviesByGenre(genre){
    const token = localStorage.getItem("token");
    const res = await fetch(`http://localhost:8080/Movie/genre/${genre}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    const data = await res.json();
    return data;
}

export async function findByTitle(title){
    const token = localStorage.getItem("token");
    const res = await fetch(`http://localhost:8080/Movie/title/${title}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    const data = await res.json();
    return data;
}

//BRANCHES
export async function getBranchById(id) {
    const token = localStorage.getItem("token");
    const res = await fetch(`http://localhost:8080/branch/read/${id}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    const data = await res.json();
    return data;
}

export async function createBranch(branch) {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:8080/branch/create", {
        method: "POST",
        headers: { "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` },
        body: JSON.stringify(branch)
    });
    return await res.json();
}

export async function updateBranch(branch) {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:8080/branch/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` },
        body: JSON.stringify(branch)
    });
    return await res.json();
}

export async function deleteBranch(id) {
    const token = localStorage.getItem("token");
    await fetch(`http://localhost:8080/branch/delete/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` },
    });
}

export async function getAllBranches() {
    const token = localStorage.getItem("token");
    const res = await fetch('http://localhost:8080/branch/getAll', {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    const data = await res.json();
    return data;
}

//THEATERS
export async function getTheaterById(id) {
    const token = localStorage.getItem("token");
    const res = await fetch(`http://localhost:8080/theaterRoom/read/${id}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    const data = await res.json();
    return data;
}

export async function createTheater(theater) {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:8080/theaterRoom/create", {
        method: "POST",
        headers: { "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` },
        body: JSON.stringify(theater)
    });
    return await res.json();
}

export async function updateTheater(theater) {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:8080/theaterRoom/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` },
        body: JSON.stringify(theater)
    });
    return await res.json();
}

export async function deleteTheater(id) {
    const token = localStorage.getItem("token");
    await fetch(`http://localhost:8080/theaterRoom/delete/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` },
    });
}

export async function getAllTheaters() {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:8080/theaterRoom/getAll", {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    const data = await res.json();
    return data;
}

export async function getAllTheatersByBranchId(id) {
    const token = localStorage.getItem("token");
    const res = await fetch(`http://localhost:8080/theaterRoom/getAll/${id}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    const data = await res.json();
    return data;
}

//SEATS
export async function getSeatById(id) {
    const token = localStorage.getItem("token");
    const res = await fetch(`http://localhost:8080/seat/read/${id}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    const data = await res.json();
    return data;
}

export async function createSeat(seat) {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:8080/seat/create", {
        method: "POST",
        headers: { "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` },
        body: JSON.stringify(seat)
    });
    return await res.json();
}

export async function updateSeat(seat) {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:8080/seat/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` },
        body: JSON.stringify(seat)
    });
    return await res.json();
}

export async function deleteSeat(id) {
    const token = localStorage.getItem("token");
    await fetch(`http://localhost:8080/seat/delete/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` },
    });
}

export async function getAllSeats() {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:8080/seat/getAll", {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    const data = await res.json();
    return data;
}

export async function updateSeatAvailability(seatId, isAvailable) {
    const token = localStorage.getItem("token");
    const res = await fetch(`http://localhost:8080/seat/updateSeats/${seatId}/${isAvailable}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` },
    });
    return await res.json();
}

export async function getAllSeatsByTheaterRoomIdAndAvailability(id, isAvailable) {
    const token = localStorage.getItem("token");
    const res = await fetch(`http://localhost:8080/seat/getAllByAvailability/${id}/${isAvailable}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    const data = await res.json();
    return data;
}

//ADMINS
export async function getAllAdmins() {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:8080/admin/getAll", {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    const data = await res.json();
    return data;
}

export async function getAdminDetails(userId) {
    console.log("getAdminDetails called with userId:",userId);// siya
    const token = localStorage.getItem("token");
    const res = await fetch(`http://localhost:8080/admin/read/${userId}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    const data = await res.json();
    console.log("getAdminDetails response:", data);//sia
    return data;
}

export async function getAdminDetailsByUsername(username) {
    const token = localStorage.getItem("token");
    const res = await fetch(`http://localhost:8080/admin/readByUsername/${username}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    const data = await res.json();
    return data;
}

export async function createAdmin(admin) {
    const res = await fetch(`http://localhost:8080/admin/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json",
                    /*"Authorization": `Bearer ${token}`*/ },
        body: JSON.stringify(admin)
    });
    return await res.json();
}

export async function updateAdmin(admin) {
    const token = localStorage.getItem("token");
    console.log("updateAdmin called with:", admin);//siya
    const res = await fetch(`http://localhost:8080/admin/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` },
        body: JSON.stringify(admin)
    });
    return await res.json();
}

export async function deleteAdmin(id) {
    const token = localStorage.getItem("token");
    await fetch(`http://localhost:8080/admin/delete/${id}`, {
        method: "DELETE",
        headers: {"Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`},
    });
}

//Card
export async function addCard(card) {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:8080/Card/create", {
        method: "POST",
        headers: { "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` },
        body: JSON.stringify(card)
    });
    return await res.json();
}

//Payment
export async function createPayment(payment){
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:8080/payment/create", {
        method: "POST",
        headers: {"Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`},
        body: JSON.stringify(payment)
    });
    return await res.json();
}

//SCHEDULE
export async function createSchedule(schedule) {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:8080/Schedule/create", {
        method: "POST",
        headers: { "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` },
        body: JSON.stringify(schedule)
    });
    return await res.json();
}

// CUSTOMER
export async function getAllCustomers() {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:8080/customer/getAll", {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    const data = await res.json();
    return data;
}

export async function getCustomerDetails(userId) {
    const token = localStorage.getItem("token");
    const res = await fetch(`http://localhost:8080/customer/read/${userId}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    const data = await res.json();
    return data;
}

export async function getCustomerDetailsByUsername(username) {
    const token = localStorage.getItem("token");
    const res = await fetch(`http://localhost:8080/customer/readByUsername/${username}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    const data = await res.json();
    return data;
}

export async function createCustomer(customer) {
    const token = localStorage.getItem("token");
    const res = await fetch(`http://localhost:8080/customer/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` },
        body: JSON.stringify(customer)
    });
    return await res.json();
}
export async function updateCustomer(customer) {
    const token = localStorage.getItem("token");
    const res = await fetch(`http://localhost:8080/customer/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` },
        body: JSON.stringify(customer)
    });
    return await res.json();
}

export async function deleteCustomer(id) {
    const token = localStorage.getItem("token");
    const cart = await getCartByUserId(id);

    if(cart) {
       await deleteCart(cart.cartId);
    }

    await fetch(`http://localhost:8080/customer/delete/${id}`, {
        method: "DELETE",
        headers: {"Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`},
    });
}

//ADDRESS
export async function createAddress(address) {
    const token = localStorage.getItem("token");
    const res = await fetch(`http://localhost:8080/house/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` },
        body: JSON.stringify(address)
    });
    return await res.json();
}

// CART
export async function createCart(cart, tokens) {
    const res = await fetch(`http://localhost:8080/cart/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json",
                    "Authorization": `Bearer ${tokens}` },
        body: JSON.stringify(cart)
    });
    return await res.json(); // expects the created cart object with cartId
}

export async function getCartByUserId(userId) {
    const token = localStorage.getItem("token");
    const res = await fetch(`http://localhost:8080/cart/readByUserId/${userId}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    if (!res.ok) throw new Error("Failed to fetch cart");
    const data = await res.json();
    return data; // expects the cart object
}

export async function deleteCart(id) {
    const token = localStorage.getItem("token");
    await fetch(`http://localhost:8080/cart/delete/${id}`, {
        method: "DELETE",
        headers: {"Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`},
    });
}

export async function createCartItem(cartItem) {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:8080/cartItem/create", {
        method: "POST",
        headers: { "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` },
        body: JSON.stringify(cartItem)
    });
    return await res.json();
}

export async function getAllCartItemsByCartId(cartId) {
    const token = localStorage.getItem("token");
    const res = await fetch(`http://localhost:8080/cartItem/getAll/${cartId}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    const data = await res.json();
    return data;
}

export async function deleteCartItem(id) {
    const token = localStorage.getItem("token");
    await fetch(`http://localhost:8080/cartItem/delete/${id}`, {
        method: "DELETE",
        headers: {"Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`},
    });
}


