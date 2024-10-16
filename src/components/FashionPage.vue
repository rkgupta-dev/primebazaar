<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-container>
        <b-navbar-brand href="#">PrimeBazaar</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item to="/dealsoftheday">Deals of the day</b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item>
              <b-button
                variant="outline-light"
                size="sm"
                @click="$bvModal.show('bv-modal-example')"
              >
                <i class="fas fa-shopping-cart d-none d-md-inline"></i>
                <span class=""> My Cart ({{ cart.length }})</span>
              </b-button>
            </b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>

    <!--Modal of Cart Section -->
    <div>
      <!-- Cart Modal -->
      <b-modal
        id="bv-modal-example"
        scrollable
        hide-footer
        title-class="font-weight-bold text-center"
        class="custom-modal"
      >
        <!-- Custom Modal Title -->
        <template #modal-title>
          <h4 class="text-dark mb-0">
            My <code>Cart</code> | ({{ cart.length }}) Items
          </h4>
        </template>

        <!-- Cart Items List -->
        <div class="cart-items-list">
          <!-- Display Cart Items if available -->
          <div v-if="cart.length">
            <!-- Iterate through cart items -->
            <b-card
              v-for="(cartItem, idx) in cart"
              :key="idx"
              class="my-3 shadow-sm rounded-lg cart-item-card border-dark"
            >
              <!-- Row layout for Image and Details -->
              <div class="d-flex align-items-start">
                <!-- Product Image -->
                <b-img
                  :src="cartItem.img"
                  alt="Product image"
                  fluid
                  class="cart-item-image rounded"
                ></b-img>

                <!-- Product Details -->
                <div class="cart-item-details ml-3">
                  <!-- Product Name -->
                  <h5 class="mb-1 text-dark font-weight-bold">
                    {{ cartItem.name }}
                  </h5>

                  <!-- Product Price and Discount -->
                  <p class="mb-2">
                    <span class="text-danger font-weight-bold h6"
                      >₹{{ cartItem.price }}</span
                    >
                    <b-badge variant="success" class="ml-2"
                      >{{ cartItem.discount }}% off</b-badge
                    >
                  </p>

                  <!-- Quantity control -->
                  <div class="d-flex align-items-center my-2">
                    <label class="mr-2 font-weight-bold">Qty:</label>
                    <b-form-spinbutton
                      :id="'sb-inline-' + idx"
                      v-model="cartItem.quantity"
                      inline
                      min="1"
                      max="100"
                      size="sm"
                      class="quantity-spinner"
                      @change="updateCartQuantity(cartItem, cartItem.quantity)"
                    ></b-form-spinbutton>

                    <!-- Remove Button -->
                    <b-button
                      variant="outline-danger"
                      size="sm"
                      @click="removeFromCart(cartItem)"
                      class="ml-2 remove-btn"
                      v-b-tooltip.hover.bottom="'Remove item'"
                    >
                      <b-icon icon="trash"></b-icon>
                    </b-button>
                  </div>
                </div>
              </div>
            </b-card>
          </div>

          <!-- No Items Message -->
          <p v-else class="text-center text-muted mt-3 no-items-message">
            Bhaiya please shopping kar ligiye na, garib company hai.
          </p>
        </div>

        <!-- Checkout Button -->
        <b-button
          variant="success"
          class="mt-4 checkout-btn"
          @click="checkoutFn()"
          block
        >
          Check Out
        </b-button>
      </b-modal>
    </div>

    <b-container class="my-4">
      <h3>Fashions Items</h3>
      <!-- Search Function -->
      <b-row>
        <b-col>
          <b-form-input
            v-model="searchQuery"
            placeholder="Search for fashions..."
            class="my-4"
          />
        </b-col>
      </b-row>

      <!-- Electronics Items List -->
      <b-row v-if="filteredItems.length === 0">
        <b-col>
          <h4>Oops! Nothing Found!</h4>
          <p>Try searching for different keywords or check our categories!</p>
        </b-col>
      </b-row>
      <b-row v-else>
        <b-col
          v-for="(item, index) in filteredItems"
          :key="index"
          md="3"
          cols="6"
          sm="6"
          class="my-2"
        >
          <b-card
            :img-src="item.img"
            img-alt="Item image"
            img-top
            class="custom-card shadow-sm"
          >
            <b-card-text>
              <p class="text-truncate mb-1">
                <strong class="text-dark">{{ item.name }}</strong>
              </p>
              <p class="d-flex align-items-center">
                <strong class="text-primary h5">₹{{ item.price }}</strong>
                <b-badge class="ml-2 py-1 px-2" variant="success" pill>
                  {{ item.discount }}% off
                </b-badge>
              </p>
              <p class="text-muted text-truncate">{{ item.description }}</p>

              <!-- Rating of product -->
              <div class="rating d-flex mb-2">
                <span
                  v-for="star in 5"
                  :key="star"
                  class="star"
                  :class="{
                    'text-warning': star <= item.rating,
                    'text-secondary': star > item.rating,
                  }"
                >
                  ★
                </span>
                <small class="ml-2 text-muted">{{ item.rating }} / 5</small>
              </div>
            </b-card-text>

            <b-button
              :variant="isInCart(item) ? 'outline-danger' : 'outline-primary'"
              @click="toggleCartItem(item)"
              size="sm"
              block
              class=""
            >
              {{ isInCart(item) ? "Remove" : "Add to Cart" }}
            </b-button>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: "",
      items: [
        {
          id: "f1",
          quantity: 1,
          name: "Trackpants",
          price: 399,
          discount: 30,
          rating: 5,
          description:
            "Soft, loose pants that you wear for doing sports or exercise, or as informal clothing.",
          img: "data:image/jpeg;base64,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",
        },
        {
          id: "f2",
          quantity: 1,
          name: "Running Shorts",
          price: 499,
          discount: 20,
          rating: 5,
          description:
            "Lightweight shorts designed for running and outdoor activities.",
          img: "data:image/jpeg;base64,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",
        },
        {
          id: "f3",
          quantity: 1,
          name: "Sports T-Shirt",
          price: 899,
          discount: 15,
          rating: 4,
          description:
            "Breathable and moisture-wicking t-shirt ideal for workouts and outdoor activities.",
          img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHO1JjROrT_oWvCPimelBbGHFjfCCjEHBjjA&s",
        },
        {
          id: "f4",
          quantity: 1,
          name: "Gym Hoodie",
          price: 1099,
          discount: 10,
          rating: 4,
          description:
            "Comfortable hoodie for warming up or relaxing post-workout.",
          img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqwER4IbyI5wCHMPmIgXoSK0WU35DNdGWZ-A&s",
        },
        {
          id: "f5",
          quantity: 1,
          name: "Trouser",
          price: 799,
          discount: 25,
          rating: 5,
          description:
            "Flexible trouser designed for comfort.",
          img: "data:image/jpeg;base64,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",
        },
        {
          id: "f6",
          quantity: 1,
          name: "Jeans",
          price: 1299,
          discount: 20,
          rating: 4,
          description:
            "High-performance jeans that provide support and improve circulation.",
          img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQN6iNFbxJdQ96z6v671NmvPiNGjpSry64F6Q&s",
        },
        {
          id: "f7",
          quantity: 1,
          name: "Fitness Tank Top",
          price: 599,
          discount: 15,
          rating: 3,
          description:
            "Lightweight tank top perfect for high-intensity workouts.",
          img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCvu8fpO2fhU-8h3ssKF1_N8c81g4GwkhV0w&s",
        },
        {
          id: "f8",
          quantity: 1,
          name: "Sweatpants",
          price: 899,
          discount: 10,
          rating: 4,
          description: "Cozy sweatpants for lounging or casual outings.",
          img: "data:image/jpeg;base64,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",
        },
        {
          id: "f9",
          quantity: 1,
          name: "Base Layer Top",
          price: 699,
          discount: 25,
          rating: 4,
          description:
            "Moisture-wicking base layer top for cold-weather workouts.",
          img: "data:image/jpeg;base64,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",
        },
        {
          id: "f10",
          quantity: 1,
          name: "Athletic Socks",
          price: 199,
          discount: 10,
          rating: 4,
          description:
            "Comfortable and breathable socks designed for sports and activities.",
          img: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMSEhUTExMVFRMWFx8aGRcYFRcYFxgYGBgYFxsVFRcaHyggGh0lGxYYITIhJSkrLi4uGh8zODMtNygtMCsBCgoKDQ0OFw8PFzcdFR0rKy0tKy0tKystKy0rLSstKy0vKys3Ny0rLSsrKzcxNy0tLTctLS0tLTMrLS0rLSstN//AABEIAOEA4QMBIgACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAABAYDBQcCCAH/xABLEAABAwEEBAkIBgcIAgMAAAABAAIRAwQSITEFQVFhBgcTInGBkaHwIzJCUnKxwdEUM2KS4fEIQ2OCssLSFyREU1Sio+I0wxVzk//EABcBAQEBAQAAAAAAAAAAAAAAAAABAgP/xAAeEQEBAQACAgMBAAAAAAAAAAAAARECMRJBIVGBE//aAAwDAQACEQMRAD8A7iiIgIiICIiAiLBbbU2lTfVeYZTaXuIEw1oJOAzwCDOiplPjR0Wc7QWnYaVX4NIWVvGZoo/4tvXTqj3sTBbkVTPGTov/AFbfuVf6V4fxm6LH+JnopVf6UwW9FSX8auix+uceilU/pUOtxwaPE3RXfGym0T954TB0JFzR/HNZNVCv18mPc4qJV452+hZCfarAdwYVco6si53wR4w61utVOjyDGMcHFxvkuAa0kEZDOBlrXREswERFAREQEREBERAREQEREBERAREQEREBeKtMOaWuEtcCCNoOBC9og+SeEeizZ7TVoHHk6jmA7QHEA9Yg9a1gauq8cuiGtt3K3frqbXSMJc3mHua0rnf0Qdvj4rY14aswB2KYLI3fvx2eCsjbE2Jx29SCD1eCv1pKmmxNEEmBIncJE90rPpGwNpve0ThiCc/NnHrQa1s+ApFEE4Zk5AY7VsrdZWMeQ0CAyduMHbvHUr9ouysYOa1o6ANo+SojcUFleLcHFjropvxLSBPN29K7cqdwV+tb0EdyuKzy7BFrtLaestl/8i0UaOwPqNaT0AmTlqVQt3HHomn5tZ9U/s6T/e8NB7VkdARcoqcfNh9Gz2o9LaQ/9ixf282T/S2jtp/1IOuIuR/28WX/AElf71P5rMzj1seuzWkdApH+cK4OrIucUeOnRrsxaG9NNp/hcVsLPxr6KeY5dzfao1QO0NITBd0Wn0RwpsdqdcoWinUfE3QedG2DitwoCIiAiIgIiICIiAiIg5xx3WObJTrxPJPunc2pAn7zWDrXCXW4eqfGtfVPCjRf0qyV6GE1Kbg2cg+JYepwaepfLMVWlwugSy6QYwjC8BOBme04LUS76fjLdlDSesk7h42rIbUW4FhaYGeBxjEYT0bislKtWhstYbrbrSQJg3YiNYyHXuX6H1jSNEhl28CMILSNkYARu1qs7y+mZzb1IPnzpwGqZGJ6R3KXpfGpIxvNaT13pHYotHCiGk4icB+8Y/3LNbD9Xj+pZ33kbZrcDIO2i33PV9shiMYgd/5EKi2j6xrfssB9/wAVerGPHjpKqLhwSHlt10/BXJU/ggfK54XD72q4LPLtXy9x2WB1LS1Ykkiq1lRpPqltyBuDmOCoS7j+kbooE2W0jY+k7qh7P/YuKBoQYwFma3x46VlYptARs7O6ehUQmsWUUlto3Db2/hKmWhreRouuiSHg4ATdeGiduAQV8M3rK1srf17Kzk6Rui8Q+9gMQKjQJ6laNFcGbO5rC6njAJ5zsZGsK4NhxD6OBtNasR9XTDR01Dn2McOtduVS4u9DUrPTqupMu33gHEnBowGPtHtVtWOXYIiKAiIgIiICIiAiIgL5w4wNHfR7faGjIvvjoqQ/DovR1L6PXG+PCwRaKFYfrKZYdk03T2xUHYrBzNmMeI8fBZWGPH4LAGz46FJYNoP4CD46lofpaJjfntXq2nm0s/qGe5yQejX464Xq3jm05/yhnunYgk2gTXb7dMdpZh3lXWynKRq16tfxVNrDy7cvPYf4FdLMIjXEfL4Sqi5cD/rf3D8FclSuBzvKj2T3D8FdVnl2rnnHrYTU0W54EmjVY/oBmmT2PXzVWpua4g5ie7NfYHDDR30mw2mj69F4HtXSWntAXyE+nOJJPSpClOiT6bRzb2fd0qfZbE914Co280XiCRENEmCJxA1R14KCyk3wVNoWZh1d60zZy9VP0K0uZUc7GI+OrsWxqYUqOH+Yerlf+yg2andEDvnWRs6B2LYWowygNlIE/vwf5VWmWu2WURAk0v4iY9wXRrIyAIyGSoBHOoNOYp0mnPOSCO9dGs2SsRfeC7Is43knvj4LbLXcH2xZ6fQe9xK2K53tRERQEREBERAREQEREBUDjosV+xNeP1dUE+y4Oae8tV/Va4yLPymjbSNjA/7jmv8A5Ug+cR1ePBUim78VHdEx48fgslN0a8so1+CtiUHb/gvdr+rpnXcI7HFRgdX5rJaXeTp7muP+45daCdVjl26+cz3M+SulmdjAGF74gqmhs2gA6nM7mtd7grhZ3eN+XuVRbuCLjyzQd/uPyV5VC4LO8uzpP8LlfVnl2ovjvTllFKvWpjAMqvZ915b8F9iL5U4zLPc0nawBHli778P/AJlIKyxT6HjDZ+Sgsbkp1nzWhNdg0nZ+am6SwMerRa3phr/mFCc2WkY478cVtbQ2bS4ftGDqinPvcqJ9Jk2sDUHtjoa1rh1yFfrINfiFRdCc61EnUXnqBLZ7CFerH4CsR0fQ4ijT9kd+KmKNo5sUqY+w33BSVyqiIiAiIgIiICIiAiIgLU8LWXrDah+wqfwOW2UDhA2bLaBtovHaxyD5cq54+N68sB8a1keF6osyM4jxh41rY9NOvx4n3rNbG+TZGRpHvc4fBebvdl3fMFZbS3m0xquZfvP/AC61ROpgm2Rqv7f2X/VWygYO73j8lWLAB9KnY53R5t33gdpVpa6CNXZrzEdaRFl4JmK1Mb/gQuhLnXBk+Xp9IXRVnkovmbjkoXdLWn7XJu7aNMe8FfTK+dePeld0nPrUKbuu9Ub/AChSDnl3AKVREa1HptU2jn46loTLMOcwbXtx6XNx361sLFjaAQMOUfj7IfiPuhRNGjylMfanZkCY7ln0fjyj9XJPM/adAHR5xVRveCFO88uIghgn94yY62q82YRHQqjwRbAecucB2AO7AX9yuNmGqFqDpNnEMaNjR7lkX4Av1cVEREBERAREQEREBERAUTS31FX/AOt38JUta7hFVu2S0O2Uah7GOQfL8ZL1Tw/PPwELfGte2OgxOHx8e5bEho/LEjMbNvxCzuEmiMDzQN83qnzPco474jujrI+W1SyMKJ3RnAEVHk90H81RP0XjanTji/sDwAf9ytLBhj4+SreiB/enyBlU2/5jMcQrQxs+N2fciNvwY+vp+0F0dc10LXDa1P2x2SF0pZ5KLgf6QbP79QdGdnA7KlT5rvi4R+kM3+9WY7aJHY//ALKQcwpKdTwyUOhnGr3LYU25k+PmtiRYHAPBPotc4dIaRhHSFIsgu037PJtHU4uPc1R6LSL5x+ru5eu4Ae4qS3mUxMm89z+i60MjtJRFw4K0YoidbnHqvFo7gMVa9HtlzRtIHaQq9oulcpsb6rQ3sACsuhGzVp73t94/FVHRERFyaEREBERAREQEREBERAVc4xLTyejbSdrLn/6OFP8AmVjVG45LWGaOLNdWqxo3QTUJ/wCPvSDhLnaulZaMHLPDqxGfUSFgL4K9UyMfGf5LYmsbkN8Ts1Y9cdgWWsYp08BgKm6AHg4feCj0n9mWe3D4SpFY3qTcsC8bBzgx2XXj1qjeaLbFrfl6Qz2lrtevBWZknDxkOxVSxVP700zN6N2BpAjpxBPUrYwgdPQrEZKeDhBwzK6jZqt9jXes0HtErlbHYnd4hdB4K2i/QAObSR1ZhZ5DcLh/6RdLytjdqLKrex1M/wAy7guMfpAV2VKlkoAg1Gte8jY15a1p6zTd2LMVyeyYkeAtjSYIGOKi0KcGCFsRTw2ePyW0emUyKZnXUAMjU1s+9/eptloTUos2BsjeZqvnpnuWGpTkUmYm9P8AyPhp7GhbTQ3PtD37J7zdafutIVFos7cNmX59ysfBuDWp9PwJ+CrbDHbGSsnBY+Wp5Z/ylW9Iv6Ii4tCIiAiIgIiICIiAiIgLj/HjpEuq0LMIAazlTtLnFzGjqDXfeXVtJ6RpWem6rWe2nTbm5xgbgNpOoa1838I9JOtdoqWh+DqjsAT5rBgxvU0DLPEqwaoswAPYvDacY6vd81nMxjB9+C9NpSM9+PxWh4ovgDuxznV0qU2rzM8OWyw10/O7iohbBG7LsWQHmGcuV7+TccOpBtLFaDylA4+ZT990+7PcFeG1ARvIk+PGS53ZzzqTsYinj0VHfNXug8ePHQrETKZwzw8YKy8E7eGVLhwa8ATscMvj2hVblMPgs9O0DbJ6Uo6uvnTjg04y2aQdSDmBtnAYyoyCXlwa58uGYDiWxqIO0roPDPjEFlsQbTcfpjwA3mzdaDDqpLhdOGrHEjCFwmm4E3KnOZ6LxgW9mXuWZFTLNaHA3KuPquGv8VPD7vQBO1QGtgQTI1HxrUqxOlwYdbgOrWT1SVpG3LblbdSbjllTpAj/AHHuWw4NUbrSSczHSGgR3krW0K9/lHziRhtio+enzWFWDRFOKLNUi994l3xVGxpwSMcRjA2Lf8HXxXpe178PitA07/GxbnQr4rU/bb7wqjpaIi4tCIiAiIgIiICIiAvL3hoJJAAEknAADMkr0uT8cfDNop1bBQfz7k13D0W3mt5IH1jMnYBBzQarjK4St0g1rKX1VN15pPpugtvEZgXXEAZ4k5xHP2VJwxkZg+cMhO8b8lt/pDXQS4tBxMscYJiYgmRns6lHtVkY79YzcZcxwMDEFwEa+zet45f1nv4/Ki3t/wAF6JlYH3mOIwftLbriM/Oa0kHLUcswFkoVgRIiN3xR0ll+Y9PaYkTtWKoyKTMIvPc8dDQKeXTHapVxz3NYzMnPDmgZu6AJOzVrXmqzlXtZSwaIZT2BrQQXnql33dqD8ZUgUjkQ0GZ1B5Py69iutKpt1bVTXU+UqBtLINFOnsDGgy8xqxnoDRmt/wDSSxwY5wc6NXnYYS5urPPI9yo2/LSMD17848bNa9NqY+OxQKVUOxBwjMHA4fipAdr8YqDV8PbFytna8YPpPEHa1/Nc3rN3sVEs05HLtjWr9wktDTZKwc4NBAAOOd5t04TkccFRWV73nRfwk6jIkPHSEEimLuB/BSKDRLnj0GGDsc/miO1ywUWOqG6yCdZyA1852rDHbuWZ9drWimwlzQZc4em+LstGyDAHR0miZQwphogF7zHUAwDtc5XejAAGwAbsNiqlho+UY3UyJ1iWgvLgfbcrMzxnirBKDvHVqWwsFSHNdORB7CtW0454/NTrO7rVR1tFgsNW/TY7a0HuWdcWhERAREQEREBEVU4Y8OaFhY5ocKloybSBmDtqEeaBIMZnCEELjM4XiyUuQpPi01BmM6bMQX7iYgdZ1LhViq0xWrMrPutqUi2TtJBBnbmZUnS1tfaKlSrUeXVKhku2EjCIyAiANQAWos1gL/rZOAAN6cJJj39q1B7r06bfNtgI303THVmsVTSTmjB7KgykXwchjBifN7VJ/wDjWRF2RtnHoKyN0cwmboEawInfHSqiJT0wZm4J6dWGBnd4zn0beKjubTIqnAFrsSScAW3edOAjctgKTW4mABrww1rYMaaQvHCqRImByLTIvuBye4TAOQneEHg0gxhp3i6q6BVcJjMeQZGcmJjEzGGAbmr0TTBpjF7ubUIxME/+OyN4F49WMYZKTDRYHwRUIlszNNpw5Qg433YxOIBJOJhWLg/oYMHKVPPcOa05sBkfeM9WW2aNJUDbJTi836RUaSZMNY0AuujUMj7R3DDStJpVA8tc97Xc4RDy29UD+UbJBlmTm4YAZLacIKJp2iqOc7lIcGy117ydVpaabzDgImAZxWntFXMNOIJOEgNMvc0gEk03ZtyLT1qC3ustMm8ML0EOaSJB5wMDaD3leRZHOwbUIEawNmZdlr2aitDojSrKdK48k3DDebJLCA5pwwESR0BYNJ6bbUF3yjWjNt5jA7pIDnRlhgg8cIbRRqTTFSo9oOJDQLxGtpcQLuGcGeiFqLMyhTcPJF0+vVI2amgA46lIJPo0ATtcKlQdROHdrWeiy0DzWBg+yKbOyOcqPTaFWo27F2m3VAp0gM5xgEa/SXugG0nS3ylXMGCKTD6wkS8455dEJT0ZVf572zqJLqhnriOrapb6tlpCbxruguIwuACL32cJ1knEIiZwba1xJuvxBipHNfJBdjkTInDDPYrEae/A+M/GSq9LTr6jmsFMDnHEOki4CdgAkAxtHaLGyvfAcMiJ3RJHegkhkEYkicMO7PxKlWTGMc4yw3nx0rX3zAdMyZ7cZWaz1i3HVq69+4ymjq3BupNBo9WR3z8VtFVeA9rvB7Z1Agd3yVqWL21BERQEWt4R6T+jWarXibjcNeJIaJ3SVzunwptFQyKrp2Ax3BWTR1OrVa0FziGtAkkmABtJVQ05w3Y13J0NedVwN0eyIx6Th0qq2zTVVwiq5zgNRvHunvUEaVpelInCCJ6+5XE1sOEnDK106beTriXGJDGT5rj6uBwXLK9VxcbzpJJN4mSSTMk7TiV0q3aMpWiiQy6LwlpBOeYMHeqJbdGuYSyo0tLdR1/aadYw/JUa4EOwjHx25d6ytBw1+I+axVKBbtKl2alPXnjmg/SzYvZEYaulZGmBziIIzOwYme9ZBSDYc9skiW0jrxwdV9Vm4iTERto8U23LtQgEn6ph35VXjYCMBrOOwrJZGRFV/PLiSxrs6jhANV37Npu+1DQMLt41l7y1bnguIDcuVcPRbspiMTjhgMypuitHOrvNWpjT16g+MmAejTbl25kuKDY8HtH8oeXqEuE3mkxznf5h3ZR2jANmxVX9nj5rxQpueQ1jSXOMAAYznlsgKRp7i+t9dobStFGk0jnA37xJzF4DKCctfe6RQ+FDm1qjQ1w5oLXE3bkagbwMkEk4ZS7Fat2j2vJPLAgEwKcG6ZvXQ5xdkSTqzVxocR1ocRylrogDZSfU95bsGHzW9sHElZ2YvtlpLtZp8nTB6Q5r/epsXHOKdhoNE3SSMMXH3Zdy/PpdJmTWN3gALrrOKHR3pfSKntV3DuZAXt3E/og52d3Ty9b+tPKGOL1dLNGTh2rAdLNORHaF2O1cSWinjmtr097apMffDlVNNcQJxNktc7GVmR/yM/pTyMUR+lyAXTiAdYxOrvWus1eA0iJEEEn0gHPvbrwaQRnzWbVudKcVel7PM2c1mDXSeHzH2JDj91Vm1WOvZyBXoVaRnDlKb2HMH0h9nvTyMWPQbyKoxF1rHCBjEXWNx23XBvS1ysllq3McbjjlhzSceoHFUrg9VaL5HpXWn93HDdi0bcFarPaAZxEeB1/grEb27I1fAYBHYdI8Y9i0tO0GmQCZZJgjUNh6B41qQLUHekD0YboyQdE4uqhNZ41Bhx24tz610FVPi90W6lRNR4h1SIGu6Jg9c+5WxYvawREUVF0nYWWik+jUm5UaWmMDjrB1EZrgWn9E2nRta5VnkyfJ1gDceNQn0X/ZOOcTmvodYrTZ2VGlj2texwhzXAFpGwg4FWUcDo6dqsHObfbtzU6jpKzVsHgNO35qycI+ANSkS+xMFSic6BcA9h/ZucQHN3EyNUzhRNKaOcwnlKFeidrqT2t6jEHqV1G8s9FtIwHzTccMTLDtG0blm0ro01afnc9uLZ2+qdx+SqNntRGBMjKcNqsFntxdTDmGbo5wGcHJ2XjYqK5VIODhBGBBwh2w7Pd2r1ZLOSbrAXHOANus6mjeSE05WY2pylwOvZkvcGzAza2AZjInUo7bRUqtgY0hqADKI1S4jA45glx3ZIJVVzGGZbUeMQc6NPWDq5Rwn2Qd4x8NYBDq0kuxDCYfV+085tpjbrwAEQDH+kMZF0tq1JkOgmm05g02HGo6NZw2bFIsdkvVG8q/nPJ5l7ylQ4AAxkNze7JUS9HWN1peXOMUxgXQRIH6qn6rRrIyOGLpu3fRWjnVncnSaIEbmtG/YNwUzg/wOrVLvKDkaIybEPjUGs9Hr7F0HR9gp0GXKbQ0a9pO1x1lS3DETQehGWZuHOeRznkYncNg3LaIiwoiIgIiICIiAvxzQRBEhfqINPbeCthrGaljsz3es6jTLu2JWtq8XWjXf4a77FWszsuPGxWpEFT/ALOdHa6DiNhr1j/PK2ejuClioEGnZqYIycRfcDtDnyQtyiaCIiAiIgIiICIiDVaV4N2S0ma1npPd6xaL/wB8c7vWgq8W1kbJsxqUCcxfdUYeltQmOohXREHOdI8VgqNhtquvzvOoh4B2tZfAA796gU+JuSDW0hUqRqbRDR+6C5wb2LqqK7RQtHcVFipZ1LQ/UZexp+8xgd3qzaH4MWOym9Qs9Nj4gvi9UI2Go6XHtW3RTQREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQf/Z",
        },
        {
          id: "f11",
          quantity: 1,
          name: "Windbreaker Jacket",
          price: 1599,
          discount: 15,
          rating: 4,
          description:
            "Lightweight and packable jacket for protection against wind and light rain.",
          img: "data:image/jpeg;base64,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",
        },
        {
          id: "f12",
          quantity: 1,
          name: "Polo Shirt",
          price: 799,
          discount: 20,
          rating: 5,
          description:
            "Stylish polo shirt suitable for casual or semi-formal occasions.",
          img: "data:image/jpeg;base64,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",
        },
      ],

      cart: [],
    };
  },
  computed: {
    filteredItems() {
      return this.items.filter(
        (item) =>
          item.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          item.description
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase())
      );
    },
  },
  mounted() {
    this.loadCartFromLocalStorage(); // Load the cart from localStorage when the component mounts
  },
  methods: {
    isInCart(item) {
      return this.cart.some((cartItem) => cartItem.id === item.id);
    },
    toggleCartItem(item) {
      if (this.isInCart(item)) {
        this.removeFromCart(item);
      } else {
        this.addToCart(item);
      }
    },
    addToCart(item) {
      this.cart.push(item);
      this.saveCartToLocalStorage();
      this.$bvToast.toast(`${item.name} added to the cart!`, {
        title: "Item Added",
        variant: "success",
        autoHideDelay: 2000, // Auto hide after 2 seconds
        solid: true,
        toaster: "b-toaster-bottom-center",
      });

      const existingProduct = this.cart.find(
        (cartItem) => cartItem.id === item.id
      );

      if (existingProduct) {
        existingProduct.quantity += 0; // Increase quantity if the product is already in the cart
      } else {
        // Add new product to the cart with default quantity 1
        this.cart.push({
          ...item,
          quantity: 1,
          img: item.img || "path/to/default/image.jpg", // Use item's img or default image
        });
        this.$bvToast.toast(`${item.name} added to the cart!`, {
          title: "Item Added",
          variant: "success",
          autoHideDelay: 2000,
          solid: true,
          toaster: "b-toaster-bottom-center",
        });
      }

      this.saveCartToLocalStorage();
    },
    updateCartQuantity(item, quantity) {
      // Correct comparison: Find the cart item by comparing the ids
      const cartItem = this.cart.find((cartItem) => cartItem.id === item.id);

      if (cartItem && quantity > 0) {
        cartItem.quantity = quantity; // Update the quantity
        this.saveCartToLocalStorage(); // Save updated cart to localStorage

        this.$bvToast.toast(`${item.name} quantity updated!`, {
          title: "Quantity Updated",
          variant: "info",
          autoHideDelay: 2000,
          solid: true,
          toaster: "b-toaster-bottom-center",
        });
      }
    },
    removeFromCart(item) {
      const index = this.cart.findIndex((cartItem) => cartItem.id === item.id);
      if (index !== -1) {
        this.cart.splice(index, 1);
        this.saveCartToLocalStorage();
      }
      this.$bvToast.toast(`${item.name} removed from the cart!`, {
        title: "Item Removed",
        variant: "danger",
        autoHideDelay: 2000, // Auto hide after 2 seconds
        solid: true,
        toaster: "b-toaster-bottom-center",
      });
    },
    saveCartToLocalStorage() {
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
    loadCartFromLocalStorage() {
      const cartFromStorage = localStorage.getItem("cart");
      if (cartFromStorage) {
        this.cart = JSON.parse(cartFromStorage);
      }
    },
    checkoutFn() {
      this.$router.push("/checkout");
    },
  },
};
</script>

<style scoped>
.custom-card img {
  width: 100px;
  height: 100px;
  margin-left: 40px;
}
.cart-item-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
}
</style>
