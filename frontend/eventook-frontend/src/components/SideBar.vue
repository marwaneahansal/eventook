<template>
  <div class="sidebar-page">
    <section class="sidebar-layout">
      <b-sidebar
        position="static"
        :expand-on-hover="expandOnHover"
        :mobile="mobile"
        :reduce="reduce"
        :delay="expandWithDelay ? 500 : null"
        :fullheight="fullheight"
        :fullwidth="fullwidth"
        :overlay="overlay"
        :right="right"
        v-model="open"
        type="is-dark"
      >
        <div class="p-3">
          <h1
            tag="router-link"
            class="is-size-3 has-text-white has-text-weight-medium has-text-centered logo mb-4">
                EVENT<span class="has-text-primary">OOK</span>
          </h1>
          <b-menu>
            <b-menu-list label="Menu">
              <b-menu-item icon="calendar-multiple" label="Events" disabled></b-menu-item>
              <b-menu-item icon="account" label="My Account" disabled></b-menu-item>
            </b-menu-list>
            <b-menu-list label="Actions">
              <b-menu-item icon="logout-variant" label="Logout" disabled></b-menu-item>
            </b-menu-list>
          </b-menu>
        </div>
      </b-sidebar>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      open: true,
      overlay: false,
      fullheight: true,
      fullwidth: false,
      right: false,
      expandOnHover: false,
      expandWithDelay: false,
      mobile: 'reduce',
      reduce: false,
    };
  },
};
</script>

<style lang="scss">
.b-sidebar {
  margin-right: 3rem;
  .sidebar-content {
    background-color: #011840 !important;

    .menu-list a {
      color: #ffffff !important;

      &:hover {
        color: #dbe2fb !important;
        background-color: transparent !important;
      }
    }

    .menu-label {
      color: #98aefe !important;
    }

    .logo {
      user-select: none;
    }
  }
}

.sidebar-page {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100vh;
    .sidebar-layout {
        display: flex;
        flex-direction: row;
        min-height: 100vh;
    }
}
@media screen and (max-width: 1023px) {
  .b-sidebar {
    .sidebar-content {
      &.is-mini-mobile {
        &:not(.is-mini-expand),
        &.is-mini-expand:not(:hover):not(.is-mini-delayed) {
          .menu-list {
            li {
              a {
                span:nth-child(2) {
                  display: none;
                }
              }
              ul {
                padding-left: 0;
                li {
                  a {
                    display: inline-block;
                  }
                }
              }
            }
          }
          .menu-label:not(:last-child)
          {
            margin-bottom: 0;
          }
        }
      }
    }
  }
}
@media screen and (min-width: 1024px) {
    .b-sidebar {
        .sidebar-content {
            &.is-mini {
                &:not(.is-mini-expand),
                &.is-mini-expand:not(:hover):not(.is-mini-delayed) {
                    .menu-list {
                        li {
                            a {
                                span:nth-child(2) {
                                    display: none;
                                }
                            }
                            ul {
                                padding-left: 0;
                                li {
                                    a {
                                        display: inline-block;
                                    }
                                }
                            }
                        }
                    }
                    .menu-label:not(:last-child) {
                      margin-bottom: 0;
                    }
                }
            }
        }
    }
}
.is-mini-expand {
  .menu-list a {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
