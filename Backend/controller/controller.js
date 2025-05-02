import { getDB } from '../config/database.js'
import { insertPhoneOtp, verifyPhoneOtp } from '../modal/userSchema.js'
//import { product } from './../../Frontend/src/components/Pages/Product/dummyProducts';

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
    console.error('Insert error:', err.message);
    if(err.code === 'ER_DUP_ENTRY'){
      return res.status(409).json({error: 'Item ID already exists'});
    }
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
  } catch (error) {
    console.error('Unexpected error:', error)
    res.status(500).json({ message: 'Unexpected server error', error })
  }
}

export const deleteProduct = async(req, res) => {
  const { item_id } = req.params;

  if(!item_id){
    return res.status(400).json({error: 'Item ID is required'});
  }
  try{
    const db = getDB();
    const [result] = await db.query('DELETE FROM PRODUCTS WHERE item_id = ? ', [item_id]);

    if(result.affectedRows === 0 ){
      return res.status(404).json({error: 'Item ID not found'});
    }
    res.status(200).json({message: 'Product deleted successfully'});
  }catch(error){
   console.error('Delete error:', err.message);
   res.status(500).json({error: 'Failed to delete product'});
  }
};

export const orderItems = async (req, res) => {
  const connection = getDB();
  await connection.beginTransaction();

  try {
    const { user, items } = req.body;
    let totalAmount = 0;
    let itemWeight = 0;

    for (let item of items) {
      const [productRows] = await connection.query(
        'SELECT stock_quantity, item_price FROM products WHERE item_id = ?',
        [item.productId]
      );

      if (productRows.length === 0) {
        throw new Error(`Product ID ${item.productId} not found`)
      }

      const product = productRows[0];

      if (product.stock_quantity < item.quantity) {
        throw new Error(`Insufficient stock for Product ID ${item.productId}`)
      }

      await connection.query(
        'UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?',
        [item.quantity, item.productId]
      );

      totalAmount += item.quantity * product.item_price;
      itemWeight += parseFloat(item.weight || 0);
    }

    const orderNumber = 'ORD-' + Date.now()
    const [orderResult] = await connection.query(
      `INSERT INTO order_address (order_number, user_name, user_phone, user_address, item_weight, total_amount)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        orderNumber,
        user.name,
        user.phone,
        user.address,
        itemWeight,
        totalAmount
      ]
    )

    const orderId = orderResult.insertId

    for (let item of items) {
      const [productRows] = await connection.query(
        'SELECT item_price FROM products WHERE item_id = ?',
        [item.productId]
      )
      const product = productRows[0]

      await connection.query(
        `INSERT INTO order_items (order_number, order_id, product_id, quantity, price)
         VALUES (?, ?, ?, ?, ?)`,
        [orderNumber, orderId, item.productId, item.quantity, product.item_price]
      )
    }

    await connection.commit()
    res.status(201).json({ message: 'Order placed successfully', orderNumber })
  } catch (err) {
    await connection.rollback()
    console.error('Order placing failed:', err)
    res.status(500).json({ message: err.message })
  }
}
