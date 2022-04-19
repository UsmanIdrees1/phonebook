<template>
    <div class="row justify-content-center">
        <div class="col-md-5">
            <h3 class="text-center">Update Contact</h3>
            <!-- <form @submit.prevent="onUpdateForm">
                <div class="form-group">
                    <v-text-field label="First Name" v-model="user.FirstName"></v-text-field>
                </div>          
                <div class="form-group">
                    <v-text-field label="Middle Name" v-model="user.MiddleName"></v-text-field>
                </div>          
                <div class="form-group">
                    <v-text-field label="Last Name" v-model="user.LastName"></v-text-field>
                </div>                
                <div class="form-group">
                    <v-text-field label="Email" v-model="user.Email"></v-text-field>
                </div>                
                <div class="form-group">
                    <v-text-field label="Organization Name" v-model="user.OrganizationName"></v-text-field>
                </div>                
                <div class="form-group">
                    <v-text-field label="Phone Number For Home" v-model="user.PhoneNumberForHome"></v-text-field>
                </div>
                <div class="form-group">
                    <v-text-field label="Phone Number For Office" v-model="user.PhoneNumberForOffice"></v-text-field>
                </div>                
                <div class="form-group">
                    <v-text-field label="Position In Organization" v-model="user.PositionInOrganization"></v-text-field>
                </div>
                <div class="form-group">
                    <button class="btn btn-info">Update Contact</button>
                </div>
            </form> -->








      <template>
        <v-row justify="center">
          <v-dialog v-model="dialog" persistent max-width="600px">
            <!-- <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark v-bind="attrs" v-on="on">
                Open Dialog
              </v-btn>
            </template> -->
            <v-card>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-form @submit.prevent="onUpdateForm">
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
                          Update Contact
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
    import { db } from '../firebaseDb';
    import router from '../router/index';
    export default {
        data() {
            return {
                dialog:true,
                user: {
                }
            }
        },
        created() {
            let dbRef = db.collection('phonebook').doc(this.$route.params.id);
            dbRef.get().then((doc) => {
                this.user = doc.data();
            }).catch((error) => {
                console.log(error)
            })
        },
        methods: {
            onUpdateForm(event) {
                event.preventDefault()
                db.collection('phonebook').doc(this.$route.params.id)
                .update(this.user).then(() => {
                    console.log("Contact successfully updated!");
                    router.push('/list')
                }).catch((error) => {
                    console.log(error);
                });
            }
        }
    }
</script>