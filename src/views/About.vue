<template>
  <div class="about">
    <div>
    </div>
    <div class="card container">
      <div class="btn btn-info">แบบฟรอมโควิด 19</div>
      <form @submit.prevent="addData">
        <div class="card-body">
          <div class="form-floating mb-3">
            <input
              type="date"
              class="form-control"
              id="floatingInput"
              placeholder="date"
              v-model="date"
            />
            <label for="floatingInput">Date</label>
          </div>
          <div class="form-floating mb-3">
            <input
              type="name"
              class="form-control"
              id="floatingInput"
              placeholder="name"
              v-model="name"
            />
            <label for="floatingInput">Name</label>
          </div>
          <div class="form-floating mb-3">
            <select
              class="form-select"
              id="floatingSelect"
              aria-label="Floating label select example"
              v-model="atk"
            >
              <option value="ผลเป็นบวก">ผลเป็นบวก</option>
              <option value="ผลเป็นลบ">ผลเป็นลบ</option>
            </select>
            <label for="floatingSelect">selects</label>
          </div>
          <div class="form-floating mb-3">
            <input
              type="tel"
              class="form-control"
              id="floatingInput"
              placeholder="phone number"
              v-model="tel"
            />
            <label for="floatingInput">Telephone</label>
          </div>
          <div class="form-floating mb-3">
            <input
              type="email"
              class="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              v-model="email"
            />
            <label for="floatingInput">Email address</label>
          </div>

          <div class="d-grid gap-2 d-md-block">
            <button type="submit"  class="btn btn-info" >กรอกข้อมูล</button>
          </div>
        </div>
      </form>
      <div class="card-body">
        <table class="container table table-striped table-hover">
          <thead>
            <tr class="table-info">
              <th scope="col">DATE</th>
              <th scope="col">NAME</th>
              <th scope="col">ATK result</th>
              <th scope="col">tel number</th>
              <th scope="col">Email</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(i, index) in csDoc" :key="index" align="center">
              <td>{{ i.data.date1 }}</td>
              <td>{{ i.data.name1 }}</td>
              <td>{{ i.data.atkresult }}</td>
              <td>{{ i.data.telnumber }}</td>
              <td>{{ i.data.email1 }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { collection, addDoc, query, onSnapshot } from "firebase/firestore";
import db from "../plugins/firebase1";

export default {
  data() {
    return {
      csDoc: [],
      name: "",
      email: "",
      atk: "",
      tel: "",
      date: "",
    };
  },
  beforeMount() {
    this.readData();
  },
  methods: {
    async addData() {
      try {
        this.csDoc = [];
        const docRef = await addDoc(collection(db, "covidtable"), {
          name1: this.name,
          email1: this.email,
          atkresult: this.atk,
          telnumber: this.tel,
          date1: this.date,
        });
        this.name = "";
        this.email = "";
        this.atk = "";
        this.tel = "";
        this.date = "";
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    },
    readData() {
      this.csDoc = [];
      const q = query(collection(db, "covidtable"));
      onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.csDoc.push({ id: doc.id, data: doc.data() });
        });
        // console.log("Current cities in CA: ", this.csDoc.join(", "));
      });
    },
  },
};
</script>

<style>
.textdatacivid {
  text-align: left;
  width: auto;
  height: auto;
}
.btn {
  width: 200px;
  height: 60px;
  background: none;
  border: 4px solid;
  color: #000000;
  font-weight: 700;
  text-transform: uppercase;
  cursor: pointer;
  font-size: 16px;
  position: relative;
}
.text {
  color: #fff;
  font-size: 60px;
  text-align: center;
  letter-spacing: 14px;
}

.text::before,
.text::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: auto;
  z-index: -1;
}

.text::before {
  color: #0019fd;
  animation: glitch-effect 3s infinite;
}

.text::after {
  color: #ff0000;
  animation: glitch-effect 2s infinite;
}
