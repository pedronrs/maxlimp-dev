import React from 'react';
import { List, ListItem, ListItemText, Drawer, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { useProducts } from '../contexts/ProductsProvider';
import { useLocation } from 'react-router-dom';

export function Sidebar({user}) {
  const { cleanSearch } = useProducts();
  const { pathname: location, hash } = useLocation();
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={toggleDrawer}
      >
        <MenuIcon />
      </IconButton>
      <Drawer anchor="left" open={open} onClose={toggleDrawer}>
        <List>
          <ListItem button component={Link} to="/" onClick={cleanSearch} selected={location === "/" && hash.slice(1) !== "contatos"}>
            <ListItemText primary="Produtos" />
          </ListItem>
          <ListItem button component={Link} to="/sobre-nos" selected={location === "/sobre-nos/"}>
            <ListItemText primary="Sobre Nós" />
          </ListItem>
          {user && (
            <>
              <ListItem button component={Link} to="/pedidos" selected={location === "/pedidos/"}>
                <ListItemText primary="Pedidos" />
              </ListItem>
              <ListItem button component={Link} to="/suporte" selected={location === "/suporte/"}>
                <ListItemText primary="Suporte" />
              </ListItem>
            </>
          )}
          <ListItem button component={Link} to="#contatos" onClick={cleanSearch} selected={location === "/" && hash.slice(1) === "contatos"}>
            <ListItemText primary="Contatos" />
          </ListItem>
          {user.type == 'admin' && (
          <ListItem button component={Link} to="/admin" onClick={cleanSearch} selected={location === "/admin/"}>
            <ListItemText primary="Administrador" />
          </ListItem>
          )}
        </List>
      </Drawer>
    </>
  );
}
