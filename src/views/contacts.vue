<template>
  <div>
    <!-- /// -->
    <v-data-table
      :headers="headers"
      :items="contacts"
      sort-by="name"
      class="elevation-2"
      :loading="loading"
      loading-text="Loading... Please wait"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>My Contacts</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-btn class="primary" @click="dialog = !dialog">Add Contact</v-btn>
        </v-toolbar>
      </template>
      <template v-slot:[`item.full_name`]="{ item }"
        >{{ item.fname }} {{ item.mName }} {{ item.lName }}</template
      >
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn @click="getContact(item)" icon>
          <v-icon>edit</v-icon>
        </v-btn>
        <v-btn @click="deleted(item)" icon>
          <v-icon>delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>
    <!-- //// -->

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
                    label="First*"
                    v-model="formDialog.fname"
                    :rules="nameRules"
                    :counter="10"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    outlined
                    v-model="formDialog.mName"
                    label="Middle"
                    :rules="nameRules"
                    :counter="10"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    outlined
                    v-model="formDialog.lName"
                    label="Last*"
                    :rules="nameRules"
                    :counter="10"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <VuePhoneNumberInput v-model="formDialog.phone" />
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
                    v-model="formDialog.role"
                    label="Role*"
                    required
                  ></v-text-field>
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
      <v-dialog v-model="dialogDelete" max-width="500px">
        <v-card>
          <v-card-title class="text-h5"
            >Are you sure you want to delete this Contact?</v-card-title
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeDelete"
              >Cancel</v-btn
            >
            <v-btn color="blue darken-1" text @click="deleteItemConfirm"
              >OK</v-btn
            >
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import VuePhoneNumberInput from "vue-phone-number-input";
import "vue-phone-number-input/dist/vue-phone-number-input.css";
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
  components: {
    VuePhoneNumberInput,
  },
  data() {
    return {
      loading: false,
      email: "",
      name: "",
      userid: "",
      selectedContactId: null,
      dialog: false,
      dialogDelete: false,
      update: false,
      confirmed: false,
      formDialog: {
        fname: "",
        mName: "",
        lName: "",
        phone: null,
        email: "",
        org: "",
        role: "",
        group: "",
      },
      contacts: [],
      ////////////
      valid: false,
      nameRules: [
        (v) => !!v || "required",
        (v) => v.length <= 10 || "Name must be less than 10 characters",
      ],
      numRules: [
        (v) => !!v || "required",
        (v) => v.length >= 14 || "Min 14 characters",
      ],
      require: [(v) => !!v || "required"],
      min: [(v) => v.length >= 14 || "Min 14 characters"],
      // iemail: "",
      // emailRules: [
      //   (v) => !!v || "E-mail is required",
      //   (v) => /.+@.+/.test(v) || "E-mail must be valid",
      // ],
      ////////////
      headers: [
        {
          text: "Name",
          align: "start",
          value: "full_name",
        },
        { text: "Phone", value: "phone" },
        { text: "Email", value: "email" },
        { text: "Organization", value: "org" },
        { text: "role", value: "role" },
        { text: "Type", value: "group" },
        { text: "Actions", value: "actions", sortable: false },
      ],
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
    closeDelete() {
      this.dialogDelete = false;
    },
    async deleteItemConfirm() {
      const db = getFirestore();
      const docid = this.selectedContactId;
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
        this.dialogDelete = false;
        console.log("res:", res);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    },
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
              mName: this.formDialog.mName,
              lName: this.formDialog.lName,
              phone: this.formDialog.phone,
              email: this.formDialog.email,
              org: this.formDialog.org,
              role: this.formDialog.role,
              group: this.formDialog.group,
            }
          );
          let contact = {};
          contact.fname = this.formDialog.fname;
          contact.mName = this.formDialog.mName;
          contact.lName = this.formDialog.lName;
          contact.phone = this.formDialog.phone;
          contact.email = this.formDialog.email;
          contact.org = this.formDialog.org;
          contact.role = this.formDialog.role;
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
        this.formDialog.fname = "";
        this.formDialog.mName = "";
        this.formDialog.lName = "";
        this.formDialog.phone = "";
        this.formDialog.email = "";
        this.formDialog.org = "";
        this.formDialog.role = "";
        this.formDialog.group = "";
      } else {
        this.dialog = false;
        this.formDialog.fname = "";
        this.formDialog.mName = "";
        this.formDialog.lName = "";
        this.formDialog.phone = "";
        this.formDialog.email = "";
        this.formDialog.org = "";
        this.formDialog.role = "";
        this.formDialog.group = "";
      }
    },
    deleted(contact) {
      this.selectedContactId = contact.id;
      this.dialogDelete = true;
    },
    //////////////////////////////////////update contact
    getContact(contact) {
      this.dialog = true;
      this.update = true;
      console.log("update:", this.update);
      console.log("contact:", contact);
      this.formDialog.fname = contact.fname;
      this.formDialog.mName = contact.mName;
      this.formDialog.lName = contact.lName;
      this.formDialog.phone = contact.phone;
      this.formDialog.email = contact.email;
      this.formDialog.org = contact.org;
      this.formDialog.role = contact.role;
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
          mName: this.formDialog.mName,
          lName: this.formDialog.lName,
          phone: this.formDialog.phone,
          email: this.formDialog.email,
          org: this.formDialog.org,
          role: this.formDialog.role,
          group: this.formDialog.group,
        }).then(() => {
          const index = this.contacts.findIndex(
            (contact) => contact.id === this.selectedContactId
          );
          // //////////////////////////////////
          this.contacts[index].fname = this.formDialog.fname;
          this.contacts[index].mName = this.formDialog.mName;
          this.contacts[index].lName = this.formDialog.lName;
          this.contacts[index].phone = this.formDialog.phone;
          this.contacts[index].email = this.formDialog.email;
          this.contacts[index].org = this.formDialog.org;
          this.contacts[index].role = this.formDialog.role;
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
      this.loading = true;
      let userid = null;
      if (this.$store.getters.getUser.uid !== null) {
        userid = this.$store.getters.getUser.uid;
      }
      const querySnapshot = await getDocs(collection(db, userid));
      querySnapshot.forEach((doc) => {
        const dat = doc.data();
        console.log(`${doc.id} => ${dat.fname}`);
        let contact = {};
        contact.fname = dat.fname;
        contact.mName = dat.mName;
        contact.lName = dat.lName;
        contact.phone = dat.phone;
        contact.email = dat.email;
        contact.org = dat.org;
        contact.role = dat.role;
        contact.group = dat.group;
        contact.id = doc.id;
        this.contacts.push(contact);
        this.loading = false;
      });
    } catch (e) {
      console.error("mounted Error adding document: ", e);
    }
  },
};
</script>

<style scoped>
.fullwidth {
  width: 100%;
}
</style>
