import { getDB } from '../config/database.js'
import { insertPhoneOtp, verifyPhoneOtp } from '../modal/userSchema.js'

export const sendOTP = async (req, res) => {
  const { phone } = req.body
  const otp = Math.floor(100000 + Math.random() * 900000).toString()
  try {
    await insertPhoneOtp(phone, otp)
    console.log(`Generated OTP for ${phone}: ${otp}`)
    res.status(201).json({ message: 'OTP send successfully' })
  } catch (error) {
    console.error('Error while login:', error.message)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export const verifyOTP = async (req, res) => {
  const { phone, otp } = req.body
  try {
    const result = await verifyPhoneOtp(phone, otp)
    if (result.success) {
      return res.status(200).json({
        message: 'OTP verified successfully',
        phone: result.phone,
        role: result.role,
        success: true
      })
    } else {
      return res
        .status(400)
        .json({ message: 'Please enter valid OTP', success: false })
    }
  } catch (error) {
    console.error('Error verifying OTP:', error.message)
    return res.status(500).json({ message: 'Internal Error' })
  }
}

export const insertProducts = async (req, res) => {
  const products = req.body
  console.log('recieved products:', products)

  if (!Array.isArray(products)) {
    return res.status(400).json({ error: 'Expected an array of products' })
  }
  try {
    const db = getDB()
    const values = products.map(prod => [
      prod.item_id,
      prod.item_category,
      prod.item_name,
      prod.item_img,
      prod.item_description,
      prod.item_price,
      prod.stock_quantity
    ])
    const sql = `INSERT INTO PRODUCTS
    (item_id, item_category, item_name, item_img, item_description, item_price, stock_quantity) VALUES ?`

    const [result] = await db.query(sql, [values])
    res.status(201).json({
      message: 'Products inserted successfully',
      inserted: result.affectedRows
    })
  } catch (err) {
    console.error('Insert error:', err.message)
    res.status(500).json({ error: 'Failed to insert products' })
  }
}

export const fetchProducts = async (req, res) => {
  try {
    const db = await getDB()
    const [rows] = await db.query('SELECT * FROM products')
    return res.status(200).json(rows)
  } catch (err) {
    console.error('Error while fetching products:', err)
    return res.status(500).json({ error: 'Failed to fetch products' })
  }
}

export const updateProducts = async (req, res) => {
  try {
    const db = getDB()
    const { id } = req.params
    const {
      item_category,
      item_name,
      item_img,
      item_description,
      item_price,
      stock_quantity,
      item_id
    } = req.body
    if (!item_description || item_price === undefined || item_price === null) {
      return res.status(400).json({
        message:
          'Validation error: All fields are required(item_description, item_price)'
      })
    }
    if (typeof item_price !== 'number' || item_price < 0) {
      return res.status(400).json({
        message: 'validation error: item_price must be a positive number'
      })
    }
    console.log('Incoming update request for ID:', id)
    console.log('Request body:', req.body)

    const sql = `UPDATE products SET item_category = ?, item_name = ?, item_img= ?,
  item_description = ?, item_price =?, stock_quantity =? WHERE item_id = ?`

    const values = [
      item_category,
      item_name,
      item_img,
      item_description,
      item_price,
      stock_quantity,
      item_id
    ]
    const result = await db.query(sql, values)
    console.log('Products updated successfully')
    res.status(200).json({
      message: 'Item updated successfully',
      inserted: result.affectedRows
    })

    console.log('Product updated successfully')
    // return res.status(200).json({ message: "Product updated successfully", result });
  } catch (error) {
    console.error('Unexpected error:', error)
    res.status(500).json({ message: 'Unexpected server error', error })
  }
}

//   const db = getDB();
//   const {id} = req.params;
//   const {item_category, item_name, item_img, item_description, item_price} = req.body;
//   console.log("Incoming update request for ID:", id);
//     console.log("Request body:", req.body);
//   const sql = `UPDATE products SET item_category = ?, item_name = ?, item_img= ?,
//   item_description = ?, item_price =? WHERE item_id = ?`;
//   db.query(sql, [item_category, item_name, item_img, item_description, item_price, id],
//   (err, result) => {
//     if(err){
//       console.error("DB error", err);
//       return res.status(500).json({message:"DB error", error:err});
//     }
//     if(result.affectedRows === 0){
//       return res.status(404).json({message: "No product found with this given ID"});
//     }

//   });
// }
