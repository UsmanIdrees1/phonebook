<template>
  <div class="row justify-content-center">
    <div class="col-md-5">
      <v-card-title>
        <h3 class="text-center">Add Contact Details</h3>
      </v-card-title>
      <template>
        <v-row justify="center">
          <v-dialog v-model="dialog" persistent max-width="600px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark v-bind="attrs" v-on="on">
                Add New Contact
              </v-btn>
            </template>
            <v-card>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-form @submit.prevent="onFormSubmit">
                      <div class="form-group">
                        <v-text-field
                          label="First Name"
                          v-model="user.FirstName"
                        ></v-text-field>
                      </div>
                      <div class="form-group">
                        <v-text-field
                          label="Middle Name"
                          v-model="user.MiddleName"
                        ></v-text-field>
                      </div>
                      <div class="form-group">
                        <v-text-field
                          label="Last Name"
                          v-model="user.LastName"
                        ></v-text-field>
                      </div>
                      <div class="form-group">
                        <v-text-field
                          label="Email"
                          v-model="user.Email"
                        ></v-text-field>
                      </div>
                      <div class="form-group">
                        <v-text-field
                          label="Organization Name"
                          v-model="user.OrganizationName"
                        ></v-text-field>
                      </div>
                      <div class="form-group">
                        <v-text-field
                          label="Phone Number For Home"
                          v-model="user.PhoneNumberForHome"
                        ></v-text-field>
                      </div>
                      <div class="form-group">
                        <v-text-field
                          label="Phone Number For Office"
                          v-model="user.PhoneNumberForOffice"
                        ></v-text-field>
                      </div>
                      <div class="form-group">
                        <v-text-field
                          label="Position In Organization"
                          v-model="user.PositionInOrganization"
                        ></v-text-field>
                      </div>
                      <div class="form-group">
                        <button class="btn btn-info btn-block">
                          Add Details
                        </button>
                        <v-btn
                          color="red darken-1"
                          text
                          @click="dialog = false"
                        >
                          Close
                        </v-btn>
                      </div>
                    </v-form>
                  </v-row>
                </v-container>
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-row>
      </template>
    </div>
  </div>
</template>
<script>
import { db } from "../firebaseDb";
export default {
  data() {
    return {
      user: {},
      dialog: false,
    };
  },
  methods: {
    onFormSubmit(event) {
      event.preventDefault();
      db.collection("phonebook")
        .add(this.user)
        .then(() => {
          alert("Contact successfully created!");
          this.user.FirstName = "";
          this.user.MiddleName = "";
          this.user.LastName = "";
          this.user.Email = "";
          this.user.OrganizationName = "";
          this.user.PhoneNumberForHome = "";
          this.user.PhoneNumberForOffice = "";
          this.user.PositionInOrganization = "";
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
