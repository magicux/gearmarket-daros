-- Hito 3 - Datos semilla GearMarket

INSERT INTO users (name, email, password, avatar)
VALUES
  ('Ana Torres', 'ana@gearmarket.cl', '$2a$10$M9dM2q9m4v3Q9gVuhJ4b5eZ5Kk2w6n88fXh1Lh0W8qYI1n8J9n9Le', NULL),
  ('Carlos Muñoz', 'carlos@gearmarket.cl', '$2a$10$M9dM2q9m4v3Q9gVuhJ4b5eZ5Kk2w6n88fXh1Lh0W8qYI1n8J9n9Le', NULL),
  ('Andrea Silva', 'andrea@gearmarket.cl', '$2a$10$M9dM2q9m4v3Q9gVuhJ4b5eZ5Kk2w6n88fXh1Lh0W8qYI1n8J9n9Le', NULL)
ON CONFLICT (email) DO NOTHING;

INSERT INTO publications (title, description, price, image_url, category, location, user_id)
VALUES
  ('Bicicleta Trek Marlin 7', 'Mountain bike aro 29 en excelente estado.', 520000, 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?auto=format&fit=crop&w=1200&q=80', 'ciclismo', 'Valparaíso', 2),
  ('Set de mancuernas ajustables 20 kg', 'Ideal para entrenamiento en casa.', 95000, 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=80', 'fitness', 'Viña del Mar', 3),
  ('Zapatillas Nike Metcon 8', 'Talla 42, excelente estabilidad.', 65000, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80', 'running', 'Santiago', 1)
ON CONFLICT DO NOTHING;

INSERT INTO favorites (user_id, publication_id)
VALUES (1, 1), (1, 2)
ON CONFLICT (user_id, publication_id) DO NOTHING;
