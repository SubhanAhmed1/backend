import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:task_management/model/user.dart';

class AuthService {
  final String baseUrl = 'http://192.168.100.105:4000/api/v1/users';

  Future register(
      String username, String email, String password, String role) async {
    final url = Uri.parse('$baseUrl/new');

    try {
      final response = await http.post(
        url,
        headers: {"Content-Type": "application/json"},
        body: jsonEncode({
          'username': username,
          'email': email,
          'password': password,
          'role': role,
        }),
      );

      if (response.statusCode == 201) {
        return (jsonDecode(response.body));
      } else {
        return (jsonDecode(response.body)('user'));
      }
    } catch (e) {
      return (e);
    }
  }

  Future login(String email, String password) async {
    final url = Uri.parse('$baseUrl/login');

    try {
      final response = await http.post(
        url,
        headers: {"Content-Type": "application/json"},
        body: jsonEncode({
          'email': email,
          'password': password,
        }),
      );

      if (response.statusCode == 200) {
        return (jsonDecode(response.body));
      } else {
        return (jsonDecode(response.body)('user'));
      }
    } catch (e) {
      return (e);
    }
  }

  Future logout() async {
    final url = Uri.parse('$baseUrl/logout');

    try {
      final response = await http.get(url);

      if (response.statusCode == 200) {
        return (jsonDecode(response.body)['message']);
      } else {
        return (jsonDecode(response.body)['user']);
      }
    } catch (e) {
      return (e);
    }
  }

  Future<void> getMyProfile() async {
    final url = Uri.parse('$baseUrl/profile');

    try {
      final response = await http.get(url);

      if (response.statusCode == 200) {
        print(jsonDecode(response.body)['user']);
      } else {
        print('Failed to get profile: ${response.body}');
      }
    } catch (e) {
      print('Error getting profile: $e');
    }
  }
}
