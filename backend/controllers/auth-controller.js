const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/users");

exports.register = async (req, res) => {
    try {
        const { restaurantName, email, password } = req.body;

        // Verifica si el usuario ya existe
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        // Hash de la contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Crear usuario
        const newUser = new User({ restaurantName, email, password: hashedPassword });
        await newUser.save();

        // 🔥 Generar el token JWT
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        // Enviar respuesta con el token y datos del usuario
        res.status(201).json({ 
            message: "User registered successfully",
            token,
            user: { id: newUser._id, restaurantName: newUser.restaurantName, email: newUser.email }
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.login = async (req, res) => {
  try {
      const { email, password } = req.body;

      // Verifica si el usuario existe
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: 'Invalid credentials' });

      // Verifica la contraseña
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

      // Genera el JWT
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
}