// ignore_for_file: non_constant_identifier_names

import 'package:flutter/material.dart';
import 'package:flutter/src/widgets/framework.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:task_management/services/auth_service.dart';
import 'package:task_management/utils/gradient_button.dart';
import 'package:task_management/utils/textfield.dart';

// ignore: must_be_immutable
class RegisterView extends StatefulWidget {
  RegisterView({super.key});

  @override
  State<RegisterView> createState() => _RegisterViewState();
}

class _RegisterViewState extends State<RegisterView> {
  TextEditingController username = TextEditingController();
  TextEditingController email = TextEditingController();
  TextEditingController password = TextEditingController();
  String _selectedRole = 'project_manager';
  AuthService _authService = AuthService();

  // final password = const SnackBar(
  //   content: Text('Wrong Password!'),
  //   backgroundColor:Color(0xFF756EF3),
  // );

  // final email = const SnackBar(
  //   content: Text('No User Found'),
  //   backgroundColor:Color(0xFF756EF3),
  // );

  // final Login = const SnackBar(
  //   content: Text('Login Successfully'),
  //   backgroundColor:Color(0xFF756EF3),
  // );

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFFFFFFF),
      appBar: AppBar(
        automaticallyImplyLeading: false,
        centerTitle: false,
        titleSpacing: 0,
        backgroundColor: const Color(0xFFFFFFFF),
        elevation: 0.0,
        title: Container(
          padding: const EdgeInsets.symmetric(horizontal: 20),
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Text(
                "Register",
                style: GoogleFonts.poppins(
                  textStyle: const TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.w600,
                    color: Color(0xFF002055),
                    height: 2,
                  ),
                ),
              )
            ],
          ),
        ),
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.only(left: 20, top: 20),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.start,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const SizedBox(
                height: 20,
              ),
              Text("Welcom Back",
                  style: GoogleFonts.poppins(
                    textStyle: const TextStyle(
                      fontSize: 25,
                      fontWeight: FontWeight.w600,
                      color: Color(0xFF002055),
                      height: 1.2,
                    ),
                  )),
              const SizedBox(
                height: 20,
              ),
              Text("Please enter your email address",
                  style: GoogleFonts.poppins(
                    textStyle: const TextStyle(
                        fontSize: 15,
                        fontWeight: FontWeight.w400,
                        color: Color(0xFF868D95),
                        height: 1),
                  )),
              const SizedBox(
                height: 10,
              ),
              Text("and password for login",
                  style: GoogleFonts.poppins(
                    textStyle: const TextStyle(
                        fontSize: 15,
                        fontWeight: FontWeight.w400,
                        color: Color(0xFF868D95),
                        height: 1),
                  )),
              const SizedBox(
                height: 50,
              ),
              SizedBox(
                  width: MediaQuery.of(context).size.width * 0.9,
                  child: MyTextField(
                    hintText: "Enter your mail",
                    controller: email,
                  )),
              SizedBox(
                  width: MediaQuery.of(context).size.width * 0.9,
                  child: MyTextField(
                    hintText: "Enter your mail",
                    controller: email,
                  )),
              const SizedBox(
                height: 25,
              ),
              SizedBox(
                  width: MediaQuery.of(context).size.width * 0.9,
                  child: MyTextField(
                    hintText: "Enter Your Password",
                    controller: password,
                    obsecureText: true,
                  )),
              DropdownButtonFormField<String>(
                value: _selectedRole,
                decoration: const InputDecoration(labelText: 'Role'),
                // ignore: prefer_const_literals_to_create_immutables
                items: [
                  const DropdownMenuItem(
                    value: 'project_manager',
                    child: Text('Project Manager'),
                  ),
                  const DropdownMenuItem(
                    value: 'employee',
                    child: Text('Employee'),
                  ),
                ],
                onChanged: (value) {
                  setState(() {
                    _selectedRole = value ?? 'project_manager';
                  });
                },
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please select a role';
                  }
                  return null;
                },
              ),
              Padding(
                padding: EdgeInsets.only(
                    left: MediaQuery.of(context).size.width * .5, top: 15),
                child: GestureDetector(
                  child: Text("Forgot Password?",
                      style: GoogleFonts.poppins(
                        textStyle: const TextStyle(
                          fontSize: 15,
                          fontWeight: FontWeight.w500,
                          color: Color(0xFF002055),
                          height: 1.2,
                        ),
                      )),
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(25),
                child: GradientButton(
                  onPressed: () {
                    _authService.register(username.text, email.text,
                        password.text, _selectedRole);
                    //  login(context);
                  },
                  gradientColors: const [Color(0xFF756EF3), Color(0xFF756EF3)],
                  width:
                      MediaQuery.of(context).size.width * 0.9, // Set the width
                  height: 47,
                  child: Text(
                    'Sign In',
                    style: GoogleFonts.poppins(
                      textStyle: const TextStyle(
                          fontSize: 15,
                          fontWeight: FontWeight.w500,
                          color: Color(0xFFFFFFFF),
                          height: 1),
                    ),
                  ), // Set the height
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
