<template>
  <div>
    <v-card max-width="400" class="mx-auto">
      <v-toolbar color="pink darken-4" dark extended>
        <v-app-bar-nav-icon>
          <v-icon>perm_contact_calendar</v-icon>
        </v-app-bar-nav-icon>

        <v-toolbar-title>Phone Book</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon>search</v-icon>
        </v-btn>
        <template v-slot:extension>
          <v-btn
            fab
            color="pink darken-1"
            bottom
            left
            absolute
            @click="dialog = !dialog"
          >
            <v-icon>add</v-icon>
          </v-btn>
        </template>
      </v-toolbar>
      <!-- //////////////////////////// -->
      <v-row class="mt-8" justify="center">
        <v-dialog v-model="dialog" persistent max-width="600px">
          <v-card>
            <v-card-title>
              <span class="text-h5">Create Contact</span>
              <v-icon class="mx-3"> contacts</v-icon>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="cancel"> Close </v-btn>
              <v-btn color="blue darken-1" text @click="submit"> Save </v-btn>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      prepend-icon="person"
                      outlined
                      label="First name*"
                      v-model="formDialog.fname"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      outlined
                      v-model="formDialog.lname"
                      label="Last name"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      outlined
                      v-model="formDialog.nickName"
                      label="Nickname*"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      prepend-icon="phone"
                      type="number"
                      v-model="formDialog.phone"
                      label="Number*"
                      outlined
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      prepend-icon="email"
                      outlined
                      v-model="formDialog.email"
                      label="Email*"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      prepend-icon="business"
                      outlined
                      v-model="formDialog.org"
                      label="Company*"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      prepend-icon="room"
                      outlined
                      v-model="formDialog.address"
                      label="Address*"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-select
                      prepend-icon="calendar_month"
                      outlined
                      v-model="formDialog.age"
                      :items="['0-17', '18-29', '30-54', '54+']"
                      label="Age*"
                      required
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-select
                      prepend-icon="groups"
                      outlined
                      v-model="formDialog.group"
                      :items="['Friends', 'Family', 'Work', 'Others']"
                      label="Group*"
                      required
                    ></v-select>
                  </v-col>
                </v-row>
              </v-container>
              <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="cancel"> Close </v-btn>
              <v-btn color="blue darken-1" text @click="submit"> Save </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
      <v-row class="mx-0">
        <v-list class="mx-auto fullwidth">
          <v-list-item v-for="(contact, index) in contacts" :key="index">
            <v-list-item-icon>
              <v-icon color="indigo"> phone </v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title v-text="contact.fname"></v-list-item-title>
            </v-list-item-content>

            <v-list-item-icon @click="getContact(contact)">
              <v-btn icon>
                <v-icon>edit</v-icon>
              </v-btn>
            </v-list-item-icon>
            <v-list-item-icon @click="deleted(contact)">
              <v-btn icon>
                <v-icon>delete</v-icon>
              </v-btn>
              <!-- <v-icon>delete</v-icon> -->
            </v-list-item-icon>
          </v-list-item>
        </v-list>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
export default {
  name: "Dashborad",
  data() {
    return {
      email: "",
      name: "",
      userid: "",
      selectedContactId: null,
      dialog: false,
      update: false,
      formDialog: {
        fname: "",
        lname: "",
        nickName: "",
        phone: null,
        email: "",
        org: "",
        address: "",
        age: "",
        group: "",
      },
      contacts: [],
    };
  },
  created() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.email = user.email;
        this.name = user.displayName;
        this.userid = user.uid;
      } else {
        console.log("logged out");
      }
    });
  },
  methods: {
    async submit() {
      if (this.update) {
        this.updateContact();
      } else {
        const db = getFirestore();
        //   const docID = this.userid;
        try {
          const docRef = await addDoc(
            collection(db, this.$store.getters.getUser.uid),
            {
              fname: this.formDialog.fname,
              lname: this.formDialog.lname,
              nickName: this.formDialog.nickName,
              phone: this.formDialog.phone,
              email: this.formDialog.email,
              org: this.formDialog.org,
              address: this.formDialog.address,
              age: this.formDialog.age,
              group: this.formDialog.group,
            }
          );
          let contact = {};
          contact.fname = this.formDialog.fname;
          contact.lname = this.formDialog.lname;
          contact.nickName = this.formDialog.nickName;
          contact.phone = this.formDialog.phone;
          contact.email = this.formDialog.email;
          contact.org = this.formDialog.org;
          contact.address = this.formDialog.address;
          contact.age = this.formDialog.age;
          contact.group = this.formDialog.group;
          contact.id = docRef.id;
          this.contacts.push(contact);
          this.dialog = false;
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      }
    },
    cancel() {
      if (this.update) {
        this.update = false;
        this.dialog = false;
      } else {
        this.dialog = false;
      }
    },
    async deleted(contact) {
      this.selectedContactId = contact.id;
      const db = getFirestore();
      const docid = contact.id;
      const docRef = doc(db, this.$store.getters.getUser.uid, docid);
      try {
        const res = await deleteDoc(docRef).then(() => {
          // someArray.splice(x, 1);
          //////////////////////////////////
          const index = this.contacts.findIndex(
            (solocontact) => solocontact.id === this.selectedContactId
          );
          //////////////////////////////////
          this.contacts.splice(index, 1);
          this.selectedContactId = null;
          console.log("done");
        });
        console.log("res:", res);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    },
    //////////////////////////////////////update contact
    getContact(contact) {
      this.dialog = true;
      this.update = true;
      console.log("update:", this.update);
      console.log("contact:", contact);
      this.formDialog.fname = contact.fname;
      this.formDialog.lname = contact.lname;
      this.formDialog.nickName = contact.nickName;
      this.formDialog.phone = contact.phone;
      this.formDialog.email = contact.email;
      this.formDialog.org = contact.org;
      this.formDialog.address = contact.address;
      this.formDialog.age = contact.age;
      this.formDialog.group = contact.group;
      this.selectedContactId = contact.id;
    },
    ///////////////////---updation---////////////////////////
    async updateContact() {
      const db = getFirestore();
      const docid = this.selectedContactId;
      const docRef = doc(db, this.$store.getters.getUser.uid, docid);
      try {
        await updateDoc(docRef, {
          fname: this.formDialog.fname,
          lname: this.formDialog.lname,
          nickName: this.formDialog.nickName,
          phone: this.formDialog.phone,
          email: this.formDialog.email,
          org: this.formDialog.org,
          address: this.formDialog.address,
          age: this.formDialog.age,
          group: this.formDialog.group,
        }).then(() => {
          const index = this.contacts.findIndex(
            (contact) => contact.id === this.selectedContactId
          );
          // //////////////////////////////////
          this.contacts[index].fname = this.formDialog.fname;
          this.contacts[index].lname = this.formDialog.lname;
          this.contacts[index].nickName = this.formDialog.nickName;
          this.contacts[index].phone = this.formDialog.phone;
          this.contacts[index].email = this.formDialog.email;
          this.contacts[index].org = this.formDialog.org;
          this.contacts[index].address = this.formDialog.address;
          this.contacts[index].age = this.formDialog.age;
          this.contacts[index].group = this.formDialog.group;
          // this.contacts[index].fname = fname;
          console.log(this.contacts);
          this.dialog = false;
          this.selectedContactId = null;
          this.update = false;
          console.log("updated");
        });
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    },
    ///////////////////////////////////////////////////////
  },
  async mounted() {
    const db = getFirestore();
    // const docID = this.userid;
    try {
      const querySnapshot = await getDocs(
        collection(db, this.$store.getters.getUser.uid)
      );
      querySnapshot.forEach((doc) => {
        const dat = doc.data();
        console.log(`${doc.id} => ${dat.fname}`);
        let contact = {};
        contact.fname = dat.fname;
        contact.lname = dat.lname;
        contact.nickName = dat.nickName;
        contact.phone = dat.phone;
        contact.email = dat.email;
        contact.org = dat.org;
        contact.address = dat.address;
        contact.age = dat.age;
        contact.group = dat.group;
        contact.id = doc.id;
        this.contacts.push(contact);
      });
    } catch (e) {
      console.error("mounted Error adding document: ", e);
    }
  },
};

/*
// our object array
let data_array = [];

// our object
let my_object = {}; 
   
// load data into object

my_object.name = "stack";
my_object.age = 20;
my_object.hair_color = "red";
my_object.eye_color = "green";
        
// push the object to Array
data_array.push(my_object);
*/
</script>

<style scoped>
.fullwidth {
  width: 100%;
}
</style>
